import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriaProdutoModule } from './categoria_produto/categoria_produto.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [ProdutosModule, DatabaseModule, CategoriaProdutoModule, ClienteModule],
})
export class AppModule { }
