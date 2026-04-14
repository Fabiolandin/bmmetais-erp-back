import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaProdutoDto } from './create-categoria_produto.dto';

export class UpdateCategoriaProdutoDto extends PartialType(CreateCategoriaProdutoDto) {
    nome: string;
}
