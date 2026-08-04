import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {
  @Inject()
  private readonly prisma: PrismaService

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const senhaHash = await bcrypt.hash(createFuncionarioDto.senha, 10);

    const funcionario = await this.prisma.funcionario.create({
      data: {
        ...createFuncionarioDto,
        senha: senhaHash,
        role: createFuncionarioDto.role ?? 'funcionario',
      },
    })

    //retornando o funcionario sem a senha
    const { senha, ...funcionarioSemSenha } = funcionario;
    return funcionarioSemSenha;
  }

  async findAll(page: number = 1, limit: number = 7) {
    //calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.funcionario.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          nome: true,
          email: true,
          cpf: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      }),
      this.prisma.funcionario.count(),
    ]);

    //retornando objeto com data:lista de funcionarios, total:total de funcionarios, 
    //page:pagina atual e totalPages:total de paginas(arredondando pra cima)
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }

    })

    if (!funcionario) {
      throw new NotFoundException(`Funcionario ${id} não encontrado`)
    }

    return funcionario
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {

    const data = { ...updateFuncionarioDto };

    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    const funcionario = await this.prisma.funcionario.update({
      where: { id },
      data,
    })

    //retornando o funcionario sem a senha
    const { senha, ...funcionarioSemSenha } = funcionario;
    return funcionarioSemSenha;
  }

  remove(id: number) {
    return this.prisma.funcionario.delete({
      where: { id }
    })
  }
}
