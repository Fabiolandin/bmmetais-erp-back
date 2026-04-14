import { Module } from '@nestjs/common';
import { CategoriaProdutoService } from './categoria_produto.service';
import { CategoriaProdutoController } from './categoria_produto.controller';

@Module({
  controllers: [CategoriaProdutoController],
  providers: [CategoriaProdutoService],
})
export class CategoriaProdutoModule {}
