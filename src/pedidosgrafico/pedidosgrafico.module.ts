import { Module } from '@nestjs/common'
import { PedidosGraficoService } from './pedidosgrafico.service';
import { PedidosGraficoController } from './pedidosgrafico.controller';

@Module({
    controllers: [PedidosGraficoController],
    providers: [PedidosGraficoService],
})

export class PedidosGraficoModule {}