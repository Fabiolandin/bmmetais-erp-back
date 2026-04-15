import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return this.prisma.fornecedor.findMany();
  }

  findOne(id: number) {
    return this.prisma.fornecedor.findUnique({
      where: { id },
    });
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
