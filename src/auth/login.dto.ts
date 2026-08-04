import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'funcionario@bmmetais.com' })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'senha123' })
    senha: string
}