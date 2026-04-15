import { Inject, Injectable } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompraService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createCompraDto: CreateCompraDto) {
    const { items, ...dadosCompra } = createCompraDto;
    return this.prisma.compra.create({
      data: {
        ...dadosCompra,
        items: {
          create: items,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.compra.findMany({
      include: {
        fornecedor: { select: { nome: true, cnpj: true } },
        funcionario: { select: { nome: true, cpf: true } },
        items: { include: { produto: { select: { nome: true, preco: true, estoque: true, categoria_produtoId: true, descricao: true, id: true } } } }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.compra.findUnique({
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

  remove(id: number) {
    return this.prisma.compra.delete({
      where: { id },
    });
  }
}
