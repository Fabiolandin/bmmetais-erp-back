import { Inject, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FuncionarioService {
  @Inject()
  private readonly prisma: PrismaService

  create(createFuncionarioDto: CreateFuncionarioDto) {
    return this.prisma.funcionario.create({
      data: createFuncionarioDto
    })
  }

  async findAll(page: number = 1, limit: number = 7) {
    //calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.funcionario.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.funcionario.count(),
    ]);

    //retornando objeto com data:lista de funcionarios, total:total de funcionarios, 
    //page:pagina atual e totalPages:total de paginas(arredondando pra cima)
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  findOne(id: number) {
    return this.prisma.funcionario.findUnique({
      where: { id }
    })
  }

  update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.prisma.funcionario.update({
      where: { id },
      data: updateFuncionarioDto
    })
  }

  remove(id: number) {
    return this.prisma.funcionario.delete({
      where: { id }
    })
  }
}
