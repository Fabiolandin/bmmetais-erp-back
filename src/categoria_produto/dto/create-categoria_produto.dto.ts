import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaProdutoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Fivelas' })
    nome: string
}
