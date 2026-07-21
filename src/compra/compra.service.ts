import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompraService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createCompraDto: CreateCompraDto) {
    const { items, ...dadosCompra } = createCompraDto;

    return this.prisma.$transaction(async (tx) => {

      const compra = await tx.compra.create({
        data: {
          ...dadosCompra,
          items: { create: items }
        }
      });

      //depois atualiza o estoque
      for (const item of items) {
        await tx.produto.update({
          where: { id: item.produtoId },
          data: { estoque: { increment: item.quantidade } }
        });
      }

      return compra;
    });
  }

  async findAll(page: number = 1, limit: number = 7) {
    //calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.compra.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          fornecedor: { select: { nome: true, cnpj: true } },
          funcionario: { select: { nome: true, cpf: true } },
          items: { include: { produto: { select: { nome: true, preco: true, estoque: true, categoria_produtoId: true, descricao: true, id: true } } } }
        }
      }),
      this.prisma.compra.count(),
    ])
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const compra = await this.prisma.compra.findUnique({
      where: { id },
      select: {
        id: true, fornecedorId: true, funcionarioId: true,
        fornecedor: { select: { nome: true, cnpj: true } },
        funcionario: { select: { nome: true } },
        items: {
          select: {
            id: true, quantidade: true, preco_unitario: true,
            produto: { select: { id: true, nome: true, preco: true, estoque: true, descricao: true } }
          }
        }
      }
    });

    if (!compra) {
      throw new NotFoundException(`Compra ${id} não encontrada`)
    }
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    const { items, ...dadosCompra } = updateCompraDto;
    return this.prisma.compra.update({
      where: { id },
      data: {
        ...dadosCompra,
        items: {
          create: items,
        },
      },
    });
  }

  async remove(id: number) {

    // const itensCompra = await this.prisma.itemCompra.findMany({
    //   where: {compraId: id},
    // })

    // for (const item of itensCompra){
    //   await this.prisma.produto.update({
    //     where: { id: item.produtoId },
    //     data: { estoque: {decrement: item.quantidade}}
    //   })
    // }

    return this.prisma.$transaction(async (tx) => {

      const itensCompra = await tx.itemCompra.findMany({
        where: { compraId: id },
      })

      for (const item of itensCompra) {
        await tx.produto.update({
          where: { id: item.produtoId },
          data: { estoque: { decrement: item.quantidade } }
        })
      }

      //primeiro deletamos os intes vinculados a compra
      await tx.itemCompra.deleteMany({
        where: { compraId: id },
      });
      return await tx.compra.delete({
        where: { id },
      });
    })

  }
}
