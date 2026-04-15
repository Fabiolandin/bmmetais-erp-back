import { IsNotEmpty, IsString } from "class-validator";

export class CreateFornecedorDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    cnpj: string

    @IsString()
    @IsNotEmpty()
    telefone: string

    @IsString()
    @IsNotEmpty()
    email: string
}
