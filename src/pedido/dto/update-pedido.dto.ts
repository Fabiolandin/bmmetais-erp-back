import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    clienteId: number
    funcionarioId: number
    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}
