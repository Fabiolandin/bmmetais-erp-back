import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFornecedorDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Fornecedor 1' })
    nome: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '12.345.678/0001-90' })
    cnpj: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '(11) 91234-5678' })
    telefone: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'joao@gmail.com' })
    email: string
}
