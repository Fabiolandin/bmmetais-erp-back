import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFuncionarioDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Funcionário 1' })
    nome: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123.456.789-10' })
    cpf: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'funcionario@bmmetais.com' })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'senha123' })
    senha: string

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'funcionario', required: false })
    role?: string
}
