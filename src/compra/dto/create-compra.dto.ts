import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCompraDto {
    @IsNumber()
    @IsNotEmpty()
    fornecedorId: number

    @IsNumber()
    @IsNotEmpty()
    funcionarioId: number

    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}
