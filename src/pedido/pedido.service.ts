import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PedidoService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createPedidoDto: CreatePedidoDto) {
    const { items, ...dadosPedido } = createPedidoDto;

    return this.prisma.$transaction(async (tx) => {

      const pedido = await tx.pedido.create({
        data: {
          ...dadosPedido,
          items: { create: items }
        }
      })

      //verifica se o produto tem estoque e ja decrementa tornando 1 instrução só
      for (const item of items) {
        const resultado = await tx.produto.updateMany({
          where: {
            id: item.produtoId,
            estoque: { gte: item.quantidade } //gte (greater than or equal to): maior ou igual a (≥).
          },
          data: { estoque: { decrement: item.quantidade } }
        })

        //caso não consiga o update, retorna 0, se for 0 a transaction quebra e da rollback
        if (resultado.count === 0) {
          throw new BadRequestException(
            `Produto ${item.produtoId} não encontrado ou estoque insuficiente`
          )
        }
      }

      return pedido;
    })
  }

  async findAll(page: number = 1, limit: number = 7) {
    //Calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.pedido.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          cliente: { select: { nome: true, telefone: true } },
          funcionario: { select: { nome: true } },
          items: { include: { produto: { select: { nome: true, preco: true, estoque: true, categoria_produtoId: true, id: true } } } }
        }
      }),
      this.prisma.pedido.count(),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      select: {
        id: true, clienteId: true, funcionarioId: true,
        cliente: { select: { nome: true, telefone: true } },
        funcionario: { select: { nome: true } },
        items: {
          select: {
            id: true, quantidade: true, preco_unitario: true,
            produto: { select: { id: true, nome: true, preco: true, estoque: true, categoria_produtoId: true } }
          }
        }
      }
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { items, ...dadosPedido } = updatePedidoDto;

    try{
      return await this.prisma.pedido.update({
        where: { id },
        data: {
          ...dadosPedido,
          items: {
            create: items,
          },
        },
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Pedido ${id} não encontrado`);
    }
    throw error;
  }
  }

  async remove(id: number) {

    try{
          return await this.prisma.$transaction(async (tx) => {

      const itensPedido = await tx.itemPedido.findMany({
        where: { pedidoId: id }
      });

      for (const item of itensPedido) {
        await tx.produto.update({
          where: { id: item.produtoId },
          data: { estoque: { increment: item.quantidade } }
        })
      }

      // Primeiro deletamos os itens vinculados ao pedido
      await tx.itemPedido.deleteMany({
        where: { pedidoId: id }
      });

      // Depois deletamos o pedido
      return tx.pedido.delete({
        where: { id },
      });

    })

    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Pedido ${id} não encontrado`);
    }
    throw error;
  }
  }
}
