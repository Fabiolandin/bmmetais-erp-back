import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PedidosGraficoService {
  @Inject()
  private readonly prisma: PrismaService;

  async findAll() {
    const result = await this.prisma.$queryRaw`
      SELECT 
        strftime('%Y-%m', p.createdAt) as mes,
        COUNT(DISTINCT p.id) as total_pedidos,
        CAST(SUM(ip.preco_unitario * ip.quantidade) AS REAL) as total_faturamento
      FROM pedido p
      INNER JOIN itempedido ip ON p.id = ip.pedidoId
      GROUP BY strftime('%Y-%m', p.createdAt)
      ORDER BY mes ASC
    `;

    return (result as any[]).map(item => ({
      mes: item.mes,
      total_pedidos: Number(item.total_pedidos),
      total_faturamento: Number(item.total_faturamento)
    }));
  }
}