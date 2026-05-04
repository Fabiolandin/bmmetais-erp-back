import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFuncionarioDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Funcionário 1' })
    nome: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123.456.789-10' })
    cpf: string
}
