import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriaProdutoModule } from './categoria_produto/categoria_produto.module';

@Module({
  imports: [ProdutosModule, DatabaseModule, CategoriaProdutoModule],
})
export class AppModule { }
