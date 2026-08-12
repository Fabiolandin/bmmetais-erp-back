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
| **Passport + JWT** | Autenticação via token, com estratégia `passport-jwt` |
| **bcrypt** | Hash de senha dos funcionários — nunca salvamos senha em texto puro |
| **Swagger (OpenAPI)** | Documentação interativa da API gerada automaticamente |
| **class-validator** | Validação dos dados que chegam nas requisições |
| **Jest** | Testes unitários e de integração |

---

## 📁 Estrutura do projeto

```
src/
├── app.module.ts           # Módulo raiz — junta tudo
├── main.ts                 # Ponto de entrada, configura o Swagger e o CORS
├── auth/                   # Login, JWT strategy, guards e decorators (@Public, @Roles)
├── common/                 # Filtro global de exceções (AllExceptionsFilter)
├── database/               # Configuração do Prisma
├── categoria_produto/      # Módulo de categorias
├── produtos/                # Módulo de produtos
├── cliente/                 # Módulo de clientes
├── funcionario/             # Módulo de funcionários
├── fornecedor/              # Módulo de fornecedores
├── pedido/                  # Módulo de pedidos
├── compra/                  # Módulo de compras
├── dashboard/                # Métricas gerais (totais de pedidos, compras, produtos)
├── pedidosgrafico/           # Dados agregados pro gráfico de pedidos/faturamento
└── validationSchemas/        # Pipe de validação global

prisma/
└── schema.prisma           # Definição dos models do banco
```

Cada módulo segue o mesmo padrão do NestJS: `controller → service → dto → entity`.

---

## 🔐 Autenticação e permissões

A API usa **JWT**. Todas as rotas são protegidas por padrão — só ficam abertas as que têm o decorator `@Public()` (hoje, só o login).

### Login

```
POST /auth/login
Body: { "email": "funcionario@bmmetais.com", "senha": "senha123" }
```

Retorna um `access_token` (válido por 1 dia). Esse token precisa ir no header de toda requisição autenticada:

```
Authorization: Bearer <token>
```

### Permissões (roles)

Existem dois níveis: `funcionario` (padrão) e `admin`. Rotas marcadas como **Admin** na tabela abaixo só funcionam com token de um usuário `role: admin` — qualquer outro token recebe `403 Forbidden`.

---

## 🗺️ Rotas da API

Todos os módulos seguem o padrão CRUD com paginação. A base URL é `http://localhost:3000`.

### 🔑 Autenticação — `/auth`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `POST` | `/auth/login` | Público | Autentica o funcionário e retorna o token JWT |

### 📦 Produtos — `/produtos`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/produtos?page=1&limit=7` | Autenticado | Lista todos os produtos (paginado) |
| `GET` | `/produtos/:id` | Autenticado | Busca um produto pelo ID |
| `POST` | `/produtos` | Autenticado | Cria um novo produto |
| `PATCH` | `/produtos/:id` | Admin | Atualiza um produto |
| `DELETE` | `/produtos/:id` | Admin | Remove um produto |

### 🏷️ Categorias de Produto — `/categoria_produto`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/categoria_produto` | Autenticado | Lista todas as categorias |
| `GET` | `/categoria_produto/:id` | Autenticado | Busca uma categoria pelo ID |
| `POST` | `/categoria_produto` | Autenticado | Cria uma nova categoria |
| `PATCH` | `/categoria_produto/:id` | Autenticado | Atualiza uma categoria |
| `DELETE` | `/categoria_produto/:id` | Autenticado | Remove uma categoria |

### 👤 Clientes — `/cliente`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/cliente` | Autenticado | Lista todos os clientes |
| `GET` | `/cliente/:id` | Autenticado | Busca um cliente pelo ID |
| `POST` | `/cliente` | Autenticado | Cadastra um novo cliente |
| `PATCH` | `/cliente/:id` | Autenticado | Atualiza um cliente |
| `DELETE` | `/cliente/:id` | Autenticado | Remove um cliente |

### 👷 Funcionários — `/funcionario`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/funcionario` | Autenticado | Lista todos os funcionários |
| `GET` | `/funcionario/:id` | Autenticado | Busca um funcionário pelo ID |
| `POST` | `/funcionario` | Admin | Cadastra um novo funcionário |
| `PATCH` | `/funcionario/:id` | Admin | Atualiza um funcionário |
| `DELETE` | `/funcionario/:id` | Admin | Remove um funcionário |

### 🚚 Fornecedores — `/fornecedor`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/fornecedor` | Autenticado | Lista todos os fornecedores |
| `GET` | `/fornecedor/:id` | Autenticado | Busca um fornecedor pelo ID |
| `POST` | `/fornecedor` | Autenticado | Cadastra um novo fornecedor |
| `PATCH` | `/fornecedor/:id` | Autenticado | Atualiza um fornecedor |
| `DELETE` | `/fornecedor/:id` | Autenticado | Remove um fornecedor |

### 🛒 Pedidos — `/pedido`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/pedido?page=1&limit=7` | Autenticado | Lista todos os pedidos (paginado) |
| `GET` | `/pedido/:id` | Autenticado | Busca um pedido pelo ID |
| `POST` | `/pedido` | Autenticado | Cria um novo pedido (decrementa estoque automaticamente) |
| `PATCH` | `/pedido/:id` | Admin | Atualiza um pedido |
| `DELETE` | `/pedido/:id` | Admin | Remove um pedido (devolve o estoque dos itens) |

### 🧾 Compras — `/compra`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/compra?page=1&limit=7` | Autenticado | Lista todas as compras (paginado) |
| `GET` | `/compra/:id` | Autenticado | Busca uma compra pelo ID |
| `POST` | `/compra` | Autenticado | Registra uma nova compra |
| `PATCH` | `/compra/:id` | Admin | Atualiza uma compra |
| `DELETE` | `/compra/:id` | Admin | Remove uma compra |

### 📊 Dashboard — `/dashboard`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/dashboard` | Autenticado | Retorna totais gerais (pedidos, compras, produtos) |

### 📈 Gráfico de Pedidos — `/pedidosgrafico`
| Método | Rota | Acesso | O que faz |
|---|---|---|---|
| `GET` | `/pedidosgrafico` | Autenticado | Retorna dados agregados por mês (total de pedidos e faturamento) pro gráfico do dashboard |

---

## 🗄️ Banco de dados

O schema do Prisma define os seguintes models:

- **Cliente** — nome, CPF, telefone, email
- **Funcionario** — nome, CPF, email, senha (hash), role (`funcionario` ou `admin`)
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

Antes de tudo, crie um arquivo `.env` na raiz do projeto com:

```env
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

Depois:

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