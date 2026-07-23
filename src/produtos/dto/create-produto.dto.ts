import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Fivela 12MM', description: 'Nome do produto' })
    nome: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Descrição da fivela 12MM', description: 'Descrição do produto' })
    descricao: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 10, description: 'Preço do produto' })
    preco: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 10, description: 'Estoque do produto' })
    estoque: number

    @IsNumber()
    @IsNotEmpty()
    categoria_produtoId: number
}
