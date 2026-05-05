# ⚙️ BM Metais — Backend (ERP API)

API REST do sistema de gestão da BM Metais. Aqui fica toda a lógica de negócio, as regras, o banco de dados e os endpoints que o front consome pra fazer tudo funcionar.

> Esse projeto é o back-end do ERP e trabalha em conjunto com o [front-end](https://github.com/Fabiolandin/bmmetais-frontend).

---

## 🚀 Tecnologias usadas

| Tecnologia | Pra que serve aqui |
|---|---|
| **NestJS 11** | Framework principal — módulos, controllers, services, tudo organizado |
| **TypeScript** | Tipagem estática, menos bug, mais confiança |
| **Prisma ORM** | Acesso ao banco com queries seguras e schema declarativo |
| **SQLite (better-sqlite3)** | Banco de dados local — simples, sem precisar instalar servidor |
| **Swagger (OpenAPI)** | Documentação interativa da API gerada automaticamente |
| **class-validator** | Validação dos dados que chegam nas requisições |
| **Jest** | Testes unitários e de integração |

---

## 📁 Estrutura do projeto

```
src/
├── app.module.ts           # Módulo raiz — junta tudo
├── main.ts                 # Ponto de entrada, configura o Swagger e o CORS
├── database/               # Configuração do Prisma
├── categoria_produto/      # Módulo de categorias
├── produtos/               # Módulo de produtos
├── cliente/                # Módulo de clientes
├── funcionario/            # Módulo de funcionários
├── fornecedor/             # Módulo de fornecedores
├── pedido/                 # Módulo de pedidos
├── compra/                 # Módulo de compras
└── validationSchemas/      # Pipes de validação globais

prisma/
└── schema.prisma           # Definição dos models do banco
```

Cada módulo segue o mesmo padrão do NestJS: `controller → service → dto → entity`.

---

## 🗺️ Rotas da API

Todos os módulos seguem o padrão CRUD com paginação. A base URL é `http://localhost:3000`.

### 📦 Produtos — `/produtos`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/produtos?page=1&limit=7` | Lista todos os produtos (paginado) |
| `GET` | `/produtos/:id` | Busca um produto pelo ID |
| `POST` | `/produtos` | Cria um novo produto |
| `PATCH` | `/produtos/:id` | Atualiza um produto |
| `DELETE` | `/produtos/:id` | Remove um produto |

### 🏷️ Categorias de Produto — `/categoria_produto`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/categoria_produto` | Lista todas as categorias |
| `GET` | `/categoria_produto/:id` | Busca uma categoria pelo ID |
| `POST` | `/categoria_produto` | Cria uma nova categoria |
| `PATCH` | `/categoria_produto/:id` | Atualiza uma categoria |
| `DELETE` | `/categoria_produto/:id` | Remove uma categoria |

### 👤 Clientes — `/cliente`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/cliente` | Lista todos os clientes |
| `GET` | `/cliente/:id` | Busca um cliente pelo ID |
| `POST` | `/cliente` | Cadastra um novo cliente |
| `PATCH` | `/cliente/:id` | Atualiza um cliente |
| `DELETE` | `/cliente/:id` | Remove um cliente |

### 👷 Funcionários — `/funcionario`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/funcionario` | Lista todos os funcionários |
| `GET` | `/funcionario/:id` | Busca um funcionário pelo ID |
| `POST` | `/funcionario` | Cadastra um novo funcionário |
| `PATCH` | `/funcionario/:id` | Atualiza um funcionário |
| `DELETE` | `/funcionario/:id` | Remove um funcionário |

### 🚚 Fornecedores — `/fornecedor`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/fornecedor` | Lista todos os fornecedores |
| `GET` | `/fornecedor/:id` | Busca um fornecedor pelo ID |
| `POST` | `/fornecedor` | Cadastra um novo fornecedor |
| `PATCH` | `/fornecedor/:id` | Atualiza um fornecedor |
| `DELETE` | `/fornecedor/:id` | Remove um fornecedor |

### 🛒 Pedidos — `/pedido`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/pedido?page=1&limit=7` | Lista todos os pedidos (paginado) |
| `GET` | `/pedido/:id` | Busca um pedido pelo ID |
| `POST` | `/pedido` | Cria um novo pedido |
| `PATCH` | `/pedido/:id` | Atualiza um pedido |
| `DELETE` | `/pedido/:id` | Remove um pedido |

### 🧾 Compras — `/compra`
| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/compra?page=1&limit=7` | Lista todas as compras (paginado) |
| `GET` | `/compra/:id` | Busca uma compra pelo ID |
| `POST` | `/compra` | Registra uma nova compra |
| `PATCH` | `/compra/:id` | Atualiza uma compra |
| `DELETE` | `/compra/:id` | Remove uma compra |

---

## 🗄️ Banco de dados

O schema do Prisma define os seguintes models:

- **Cliente** — nome, CPF, telefone, email
- **Funcionario** — nome, CPF
- **Fornecedor** — nome, CNPJ, telefone, email
- **Produto** — nome, descrição, preço, estoque, categoria
- **Categoria_Produto** — agrupamento dos produtos
- **Pedido** — vínculo entre cliente, funcionário e itens
- **ItemPedido** — produtos dentro de um pedido (quantidade + preço unitário)
- **Compra** — vínculo entre fornecedor, funcionário e itens
- **ItemCompra** — produtos dentro de uma compra

---

## 📖 Documentação interativa (Swagger)

Com a API rodando, acesse `http://localhost:3000/api` pra ver e testar todas as rotas direto pelo navegador. Não precisa de Postman, Insomnia, nada.

---

## ⚙️ Como rodar

```bash
# Instala as dependências
npm install

# Roda as migrations do banco
npx prisma migrate dev

# Sobe em modo desenvolvimento (com hot reload)
npm run start:dev
```

A API vai estar disponível em `http://localhost:3000`.

---

## 📦 Outros comandos úteis

```bash
npm run start:prod   # Roda em modo produção
npm run build        # Compila o TypeScript
npm run test         # Roda os testes
npm run test:cov     # Testes com cobertura de código
npm run lint         # Verifica e corrige o código
```

---

## 🔗 Projeto relacionado

Esse back-end serve os dados pro **BM Metais Frontend** — vai lá conferir também:
👉 [bmmetais-frontend](https://github.com/Fabiolandin/bmmetais-frontend)
