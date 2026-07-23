import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCompraDto {
    @IsNumber()
    @IsNotEmpty()
    fornecedorId: number

    @IsNumber()
    @IsNotEmpty()
    funcionarioId: number

    @IsArray()
    @IsNotEmpty()
    items: {
        produtoId: number
        quantidade: number
        preco_unitario: number
    }[]
}
