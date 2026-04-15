import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriaProdutoModule } from './categoria_produto/categoria_produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';

@Module({
  imports: [ProdutosModule, DatabaseModule, CategoriaProdutoModule, ClienteModule, FornecedorModule],
})
export class AppModule { }
