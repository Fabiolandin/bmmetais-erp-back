import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PedidosGraficoService } from "./pedidosgrafico.service";

@ApiTags('PedidosGrafico')
@Controller('pedidosgrafico')
export class PedidosGraficoController {
    constructor(private readonly pedidosgraficoService: PedidosGraficoService) {}

    @Get()
    findAll(){
        return this.pedidosgraficoService.findAll();
    }

}