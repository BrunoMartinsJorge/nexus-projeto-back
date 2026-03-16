# 📦 Teste Prático - Desenvolvedor Backend | Nexus

Teste prático de back-end **Nexus** sobre carteira de **Criptomoedas** -> **Wallet Crypto**

------------------------------------------------------------------------

## 🚧 Estrutura do Projeto

```
├── 📁 generated
├── 📁 mock
│   ├── ⚙️ SaldoMock.json
│   └── 📄 SaldoMockModel.ts
├── 📁 prisma
│   ├── 📁 migrations
│   │   ├── 📁 datahora-nome-migration
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   ├── 📄 prisma.ts
│   └── 📄 schema.prisma
├── 📁 src
│   ├── 📁 core
│   │   └── 📁 middlewares
│   │       ├── 📄 auth.middleware.spec.ts
│   │       └── 📄 auth.middleware.ts
│   ├── 📁 modules
│   │   ├── 📁 auth
│   │   │   ├── 📁 controllers
│   │   │   │   ├── 📄 auth.controller.spec.ts
│   │   │   │   └── 📄 auth.controller.ts
│   │   │   ├── 📁 exceptions
│   │   │   │   ├── 📄 UsuarioJaCadastradoException.ts
│   │   │   │   └── 📄 UsuarioNaoEncontradoException.ts
│   │   │   ├── 📁 forms
│   │   │   │   ├── 📄 LoginForm.ts
│   │   │   │   └── 📄 RegistroForm.ts
│   │   │   ├── 📁 services
│   │   │   │   ├── 📄 auth.service.spec.ts
│   │   │   │   └── 📄 auth.service.ts
│   │   │   └── 📄 auth.module.ts
│   │   ├── 📁 movimentacoes
│   │   │   ├── 📁 controller
│   │   │   │   ├── 📄 movimentacoes.controller.spec.ts
│   │   │   │   └── 📄 movimentacoes.controller.ts
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 MovimentacoesDto.ts
│   │   │   ├── 📁 services
│   │   │   │   ├── 📄 movimentacoes.service.spec.ts
│   │   │   │   └── 📄 movimentacoes.service.ts
│   │   │   └── 📄 movimentacoes.module.ts
│   │   ├── 📁 saque
│   │   │   ├── 📁 controller
│   │   │   │   ├── 📄 saque.controller.spec.ts
│   │   │   │   └── 📄 saque.controller.ts
│   │   │   ├── 📁 form
│   │   │   │   └── 📄 SaqueForm.ts
│   │   │   ├── 📁 service
│   │   │   │   ├── 📄 saque.service.spec.ts
│   │   │   │   └── 📄 saque.service.ts
│   │   │   └── 📄 saque.module.ts
│   │   ├── 📁 swap
│   │   │   ├── 📁 controller
│   │   │   │   └── 📄 swap.controller.ts
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 CotasaoDto.ts
│   │   │   ├── 📁 form
│   │   │   │   └── 📄 CotasaoForm.ts
│   │   │   ├── 📁 services
│   │   │   │   ├── 📄 swap.service.spec.ts
│   │   │   │   └── 📄 swap.service.ts
│   │   │   └── 📄 swap.module.ts
│   │   ├── 📁 transacoes
│   │   │   ├── 📁 controller
│   │   │   │   ├── 📄 transacoes.controller.spec.ts
│   │   │   │   └── 📄 transacoes.controller.ts
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 TransacaoDto.ts
│   │   │   ├── 📁 service
│   │   │   │   ├── 📄 transacoes.service.spec.ts
│   │   │   │   └── 📄 transacoes.service.ts
│   │   │   └── 📄 transacoes.module.ts
│   │   ├── 📁 wallet
│   │   │   ├── 📁 controllers
│   │   │   │   ├── 📄 wallet.controller.spec.ts
│   │   │   │   └── 📄 wallet.controller.ts
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 WalletBalanceDto.ts
│   │   │   │   └── 📄 WalletDto.ts
│   │   │   ├── 📁 services
│   │   │   │   ├── 📄 wallet.service.spec.ts
│   │   │   │   └── 📄 wallet.service.ts
│   │   │   └── 📄 wallet.module.ts
│   │   └── 📁 webhook
│   │       ├── 📁 controller
│   │       │   ├── 📄 webhook.controller.spec.ts
│   │       │   └── 📄 webhook.controller.ts
│   │       ├── 📁 exceptions
│   │       │   ├── 📄 DepositoJaExistenteException.ts
│   │       │   └── 📄 DepositoNaoGeradoException.ts
│   │       ├── 📁 forms
│   │       │   └── 📄 DepositForm.ts
│   │       ├── 📁 service
│   │       │   ├── 📄 webhook.service.spec.ts
│   │       │   └── 📄 webhook.service.ts
│   │       └── 📄 webhook.module.ts
│   ├── 📁 shared
│   │   ├── 📁 exceptions
│   │   │   ├── 📄 CarteiraNaoEncontradaException.ts
│   │   │   ├── 📄 HttpExceptionFilter.ts
│   │   │   ├── 📄 IllegalAccessException.ts
│   │   │   ├── 📄 ObjectEqualsException.ts
│   │   │   ├── 📄 ObjectNotFoundException.ts
│   │   │   ├── 📄 TokenInvalidaException.ts
│   │   │   └── 📄 TokenNaoEncontradaException.ts
│   │   ├── 📁 prisma
│   │   │   ├── 📄 prisma.module.ts
│   │   │   ├── 📄 prisma.service.spec.ts
│   │   │   └── 📄 prisma.service.ts
│   │   └── 📁 services
│   │       ├── 📄 Token.service.ts
│   │       └── 📄 transacao.service.ts
│   ├── 📄 app.module.ts
│   └── 📄 main.ts
├── 📁 test
│   ├── 📄 app.e2e-spec.ts
│   └── ⚙️ jest-e2e.json
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📄 eslint.config.mjs
├── ⚙️ nest-cli.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 prisma.config.ts
└── ⚙️ tsconfig.json
```

---
*Generated by FileTree Pro Extension*

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js
-   NestJS
-   React
-   Prisma ORM
-   PostgreSQL
<!-- -   Zod (validação de dados)
-   Redis (cache e performance) -->

------------------------------------------------------------------------

## ⚙️ Instalação

Clone o repositório:

``` bash
git clone https://github.com/BrunoMartinsJorge/nexus-projeto-back.git
cd nexus-projeto-back
npm install
```

------------------------------------------------------------------------

## 🗄️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

    DATABASE_URL="postgresql://user:password@localhost:5432/nexus"

    JWT_SECRET="CODIGO DA SECRET DO JWT"

------------------------------------------------------------------------

## 🛠️ Banco de Dados

Gerar o cliente do Prisma:

``` bash
npx prisma generate
```

Rodar migrations:

``` bash
npx prisma migrate dev
```

------------------------------------------------------------------------

## ▶️ Executando o Projeto

Modo desenvolvimento:

``` bash
npx nest start --watch
```

Modo produção:

``` bash
npm run build
npm run start:prod
```

------------------------------------------------------------------------

## 🔄 Sistema de Transações

O sistema registra todas as movimentações:

-   Depósitos
-   Saques
-   Swaps/Trocas de tokens
-   Taxas

Cada transação armazena:

-   usuarioId
-   tipo
-   token
-   valor
-   saldoAnterior
-   saldoNovo
-   data

------------------------------------------------------------------------

## 📌 Funcionalidades

✔ Cadastro de usuários\
✔ Login com autenticação\
✔ Controle de saldo\
✔ Swap entre tokens\
✔ Registro de movimentações\
✔ Sistema de taxas

------------------------------------------------------------------------

## 📖 API Endpoints (exemplo)

### Usuários / Autenticação

Base: /auth

| POST -> /login -> Login de usuário

| POST -> /registro -> Registrar usuário

### Movimentações

Base: /movimentacoes

| GET -> /pagina:pagina/limite:limite -> Listagem páginada de movimentações

### Saque

Base: /saque

| POST -> / -> Realizar saque

### Swap

Base: /swap

| POST -> /cota -> Realiza a cotação de um saque

| POST -> /efetuar-swap -> Efetua o swap/troca de tokens

### Transações

Base: /transacoes

| GET -> /pagina:pagina/limite:limite -> Listagem páginada de transações

### Wallet

Base: /wallet

| GET -> / -> Lista a carteira de um usuário e seus saldos

| GET -> /saldo -> Busca o saldo do usuário no Mock de dados

### Webhook

Base: /webhook

| GET -> /deposit -> Realiza o deposito via webhook

| GET -> /usuarios -> Busca os usuário para a simulação do webhook

------------------------------------------------------------------------

## 👨‍💻 Autor

Feito por:

Bruno Martins Jorge
