import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePedidoDto {
    @IsNumber()
    @IsNotEmpty()
    clienteId: number

    @IsNumber()
    @IsNotEmpty()
    funcionarioId: number

    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}