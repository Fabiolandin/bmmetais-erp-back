import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DashboardService {
  @Inject()
  private readonly prisma: PrismaService;

  async findAll() {
    const totalPedidos = await this.prisma.pedido.count();
    const totalCompras = await this.prisma.compra.count();
    const totalProdutos = await this.prisma.produto.count();
    return { 
      totalPedidos, 
      totalCompras, 
      totalProdutos 
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

}
