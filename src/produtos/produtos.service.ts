import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProdutosService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createProdutoDto: CreateProdutoDto) {
    const { categoria_produtoId, ...dadosProduto } = createProdutoDto;
    return this.prisma.produto.create({
      data: {
        ...dadosProduto,
        preco: +dadosProduto.preco,
        estoque: +dadosProduto.estoque,
        categoria: {
          connect: { id: +categoria_produtoId },
        },
      },
    });
  }

  async findAll(page: number = 1, limit: number = 7) {
    //Calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.produto.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.produto.count(),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) }

  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      select:{
        id: true, nome: true, descricao: true, preco: true, categoria_produtoId:true, estoque:true, createdAt: true, updatedAt: true,
        categoria: { select: {id: true, nome: true}}
      }
    });

    if(!produto){
      throw new NotFoundException(`Produto ${id} não encontrado`)
    }
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  remove(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }

  async updateEstoque(produtoId: number, quantidade: number) {
    return this.prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: +quantidade },
    });
  }

  async updateEstoqueSaida(produtoId: number, quantidade: number) {
    return this.prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: -quantidade },
    });
  }
}
