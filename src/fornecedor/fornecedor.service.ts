import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FornecedorService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createFornecedorDto: CreateFornecedorDto) {
    return this.prisma.fornecedor.create({
      data: createFornecedorDto,
    });
  }

  async findAll(page: number = 1, limit: number = 7) {
    //calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.fornecedor.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.fornecedor.count(),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if(!fornecedor){
      throw new NotFoundException(`Fornecedor ${id} não encontrado`)
    }

    return fornecedor;
  }

  update(id: number, updateFornecedorDto: UpdateFornecedorDto) {
    return this.prisma.fornecedor.update({
      where: { id },
      data: updateFornecedorDto,
    });
  }

  remove(id: number) {
    return this.prisma.fornecedor.delete({
      where: { id },
    });
  }
}
