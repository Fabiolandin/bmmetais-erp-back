import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string
}
