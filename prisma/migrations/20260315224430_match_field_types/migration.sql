-- CreateEnum
CREATE TYPE "tipo_valor" AS ENUM ('BRL', 'BTC', 'ETH');

-- CreateEnum
CREATE TYPE "Tipo_Transacao" AS ENUM ('DEPOSITO', 'SWAP', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "Tipo_Movimentacao" AS ENUM ('DEPOSIT', 'SWAP_IN', 'SWAP_OUT', 'SWAP_FEE', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteira" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saldo" (
    "id" SERIAL NOT NULL,
    "quantidade" DECIMAL(65,30) NOT NULL,
    "carteiraid" INTEGER NOT NULL,
    "tipo" "tipo_valor" NOT NULL,

    CONSTRAINT "saldo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposito" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "token" "tipo_valor" NOT NULL,
    "amount" INTEGER NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deposito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo_Transacao" NOT NULL,
    "carteiraId" INTEGER NOT NULL,
    "tokenFrom" "tipo_valor",
    "tokenTo" "tipo_valor",
    "valorFrom" DECIMAL(65,30),
    "valorTo" DECIMAL(65,30),
    "taxa" DECIMAL(65,30),
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "tipo" "Tipo_Movimentacao" NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "token" "tipo_valor" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "saldoAnterior" DECIMAL(65,30) NOT NULL,
    "saldoNovo" DECIMAL(65,30) NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "carteira_usuarioId_key" ON "carteira"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "saldo_carteiraid_tipo_key" ON "saldo"("carteiraid", "tipo");

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saldo" ADD CONSTRAINT "saldo_carteiraid_fkey" FOREIGN KEY ("carteiraid") REFERENCES "carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposito" ADD CONSTRAINT "Deposito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
