import { Module, ValidationPipe } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { DatabaseModule } from './database/database.module';
import { CategoriaProdutoModule } from './categoria_produto/categoria_produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { PedidoModule } from './pedido/pedido.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { CompraModule } from './compra/compra.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ProdutosModule, DatabaseModule, CategoriaProdutoModule, ClienteModule, FornecedorModule, PedidoModule, FuncionarioModule, CompraModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ]
})
export class AppModule { }
