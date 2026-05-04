import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'João Silva' })
    nome: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123.456.789-10' })
    cpf: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '(11) 99234-5288' })
    telefone: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'joao@gmail.com' })
    email: string
}
