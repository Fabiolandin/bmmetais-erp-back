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

  findAll() {
    return this.prisma.cliente.findMany();
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
