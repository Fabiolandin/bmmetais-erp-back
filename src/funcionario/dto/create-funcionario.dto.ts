import { IsNotEmpty, IsString } from "class-validator";

export class CreateFuncionarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    cpf: string
}
