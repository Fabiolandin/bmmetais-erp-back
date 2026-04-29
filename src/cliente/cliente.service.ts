import { Inject, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ClienteService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createClienteDto: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async findAll(page: number = 1, limit: number = 7) {
    //calcula quantos registros pular
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.cliente.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.cliente.count(),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
