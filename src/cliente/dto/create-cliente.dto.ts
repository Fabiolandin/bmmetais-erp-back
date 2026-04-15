import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    cpf: string

    @IsString()
    @IsNotEmpty()
    telefone: string

    @IsString()
    @IsNotEmpty()
    email: string
}
