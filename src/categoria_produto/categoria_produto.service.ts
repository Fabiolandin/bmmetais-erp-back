import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoriaProdutoDto } from './dto/create-categoria_produto.dto';
import { UpdateCategoriaProdutoDto } from './dto/update-categoria_produto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriaProdutoService {
  @Inject()
  private readonly prisma: PrismaService

  create(createCategoriaProdutoDto: CreateCategoriaProdutoDto) {
    return this.prisma.categoria_Produto.create({
      data: createCategoriaProdutoDto,
    });
  }

  async findAll(page: number = 1, limit: number = 7) {
    //Calcula quantos registros pular
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      this.prisma.categoria_Produto.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.categoria_Produto.count(),
    ])

    return { data, total, page, totalPages: Math.ceil(total / limit) }
  }

  findOne(id: number) {
    return this.prisma.categoria_Produto.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCategoriaProdutoDto: UpdateCategoriaProdutoDto) {
    return this.prisma.categoria_Produto.update({
      where: { id },
      data: updateCategoriaProdutoDto,
    });
  }

  remove(id: number) {
    return this.prisma.categoria_Produto.delete({
      where: { id },
    });
  }
}
