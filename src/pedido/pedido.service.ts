import { Inject, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PedidoService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createPedidoDto: CreatePedidoDto) {
    const { items, ...dadosPedido } = createPedidoDto;
    return this.prisma.pedido.create({
      data: {
        ...dadosPedido,
        items: {
          create: items,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.pedido.findMany({
      include: {
        cliente: { select: { nome: true, telefone: true } },
        funcionario: { select: { nome: true, cpf: true } },
        items: { include: { produto: { select: { nome: true, preco: true, estoque: true, categoria_produtoId: true, descricao: true, id: true } } } }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { items, ...dadosPedido } = updatePedidoDto;
    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...dadosPedido,
        items: {
          create: items,
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
