import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return this.prisma.produto.findMany();
  }

  findOne(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
    });
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
}
