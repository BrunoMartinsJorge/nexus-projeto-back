# 📦 Teste Prático - Desenvolvedor Backend | Nexus

Implementação de uma **API de carteira de criptomoedas (Crypto Wallet)** desenvolvida como teste técnico para a **Nexus**.

A aplicação permite:

- cadastro e autenticação de usuários
- gerenciamento de carteira
- depósitos
- swaps entre tokens
- saques
- registro completo de movimentações financeiras

---

# 🌐 Demo

Frontend hospedado:

https://nexus-teste-back-arquivo-front-mnwk42hu9.vercel.app/

---

# 🧠 Decisões Técnicas

### NestJS
Escolhi **NestJS** ao invés de Express puro pois ele oferece:

- arquitetura modular
- injeção de dependência
- melhor organização de código
- maior escalabilidade para projetos grandes

Isso facilita manter separação entre **controllers, services e módulos**.

---

### Prisma ORM

Escolhi **Prisma** ao invés de ORMs tradicionais como TypeORM porque ele oferece:

- tipagem forte com TypeScript
- migrations simples
- queries mais seguras
- excelente integração com PostgreSQL

---

### PostgreSQL

Utilizado como banco de dados principal por ser:

- robusto
- altamente confiável
- amplamente utilizado em sistemas financeiros
- com ótimo suporte a tipos numéricos (Decimal)

---

### Arquitetura Modular

O projeto foi dividido em módulos seguindo o padrão do NestJS:

Auth
Wallet
Swap
Saque
Movimentações
Transações
Webhook

Isso permite:

- isolamento de responsabilidades
- código mais organizado
- maior facilidade de manutenção

---

### Sistema de Movimentações

Todas as operações financeiras geram **registros de movimentação** contendo:

- saldo anterior
- saldo novo
- tipo da operação
- token utilizado
- data da operação

---

# 🗄️ Estrutura do Banco de Dados

O banco foi projetado para simular uma **carteira multi-token**.

## Usuários

Tabela responsável por armazenar os dados dos usuários.

Campos principais:

- id
- email
- senha
- nome

Relacionamentos:

- 1 usuário possui **1 carteira**
- 1 usuário possui **muitas movimentações**
- 1 usuário pode ter **muitos depósitos**

## Carteira

Cada usuário possui **uma carteira**.


Campos:

- id
- usuarioId

Relacionamentos:

- uma carteira possui **vários saldos**
- uma carteira possui **várias transações**

---

## Saldos

Tabela responsável por armazenar o saldo de cada token da carteira.


Campos:

- quantidade
- tipo do token

Tokens suportados: BTC | BRL | ETH

## Depósitos

Simulação de depósitos via webhook.

Campos:

- token depositado
- valor
- idempotencyKey

A **idempotencyKey** garante que o mesmo depósito **não seja processado duas vezes**.

---

## Transações

Registro de operações financeiras de alto nível.

Tipos de transação: DEPOSITO | SWAP | WITHDRAWAL

Campos principais:

- token origem
- token destino
- valor origem
- valor destino
- taxa aplicada

---

## Movimentações

Registro detalhado das alterações de saldo.

Tipos: DEPOSIT | SWAP_IN | SWAP_OUT | SWAP_FEE | WITHDRAWAL

Campos importantes:

- valor movimentado
- saldo anterior
- saldo novo
- token
- data da operação

Isso permite **rastrear exatamente como cada saldo mudou ao longo do tempo**.

------------------------------------------------------------------------

## 🚧 Estrutura do Projeto

```
├── 📁 generated
├── 📁 mock
│   ├── ⚙️ SaldoMock.json
│   └── 📄 SaldoMockModel.ts
├── 📁 prisma
│   ├── 📁 migrations
│   │   ├── 📁 20260315224430_match_field_types
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260315225452_transform_field_idempotency_key_to_unique
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
│   │   │   │   ├── 📄 LoginFormSchema.ts
│   │   │   │   └── 📄 RegistroFormSchema.ts
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
│   │   │   │   └── 📄 SaqueFormSchema.ts
│   │   │   ├── 📁 service
│   │   │   │   ├── 📄 saque.service.spec.ts
│   │   │   │   └── 📄 saque.service.ts
│   │   │   └── 📄 saque.module.ts
│   │   ├── 📁 swap
│   │   │   ├── 📁 controller
│   │   │   │   └── 📄 swap.controller.ts
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 CotacaoDto.ts
│   │   │   ├── 📁 form
│   │   │   │   └── 📄 CotacaoFormSchema.ts
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
│   │       │   └── 📄 DepositFormSchema.ts
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
│   │       ├── 📄 DecodedJwtModel.ts
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

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js
-   NestJS
-   React
-   Prisma ORM
-   PostgreSQL
-   Zod

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

    DATABASE_URL="URL do Banco de dados"
    
    JWT_ACCESS_SECRET="Secret do JWT"
    
    JWT_REFRESH_SECRET="Secret do JWT para refresh token"
    
    API_KEY="Chave de API do CoinGecko"
    
    URL_FRONT="URL do front para permitir o acesso ao CORS"

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

## 📌 Funcionalidades

✔ Cadastro de usuários\
✔ Login com autenticação\
✔ Controle de saldo\
✔ Swap entre tokens\
✔ Registro de movimentações\
✔ Sistema de taxas

------------------------------------------------------------------------

## 📖 API Endpoints

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

## Front

Para utilizar o front da aplicação clone o repositório do front e siga o passo a passo de como rodar o projeto em React

| https://github.com/BrunoMartinsJorge/nexus-teste-back-arquivo-front.git

------------------------------------------------------------------------

## 👨‍💻 Autor

Feito por:

Bruno Martins Jorge
