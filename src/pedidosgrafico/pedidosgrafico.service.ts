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

    //strfime conversor de sqlite, em outros dbs muda esse comando de formatação
    //inner join : junta a tabela pedido com itempedido
    //count distinc : conta os pedidos unicos pq um pedido tem vários itens pedidos e o join cria várias linhas
    //cast... as real : converte o resultado pra número de ponto flutuante.
    //sum: soma os valores de cada item * preço
    //group by: agrupando as linhas por ,es
    //order by mes asc: ordena cronologicamente do mais antigo para o mais novo

    return (result as any[]).map(item => ({
      mes: item.mes,
      total_pedidos: Number(item.total_pedidos),
      total_faturamento: Number(item.total_faturamento)
    }));

    //conversor para tipos limpos
  }
}