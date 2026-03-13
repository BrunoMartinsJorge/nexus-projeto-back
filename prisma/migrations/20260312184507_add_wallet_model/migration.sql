-- CreateEnum
CREATE TYPE "tipo_valor" AS ENUM ('BRL', 'BTC', 'ETH');

-- CreateTable
CREATE TABLE "carteira" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saldo" (
    "id" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "carteiraid" INTEGER NOT NULL,
    "tipo" "tipo_valor" NOT NULL,

    CONSTRAINT "saldo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carteira_usuarioId_key" ON "carteira"("usuarioId");

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saldo" ADD CONSTRAINT "saldo_carteiraid_fkey" FOREIGN KEY ("carteiraid") REFERENCES "carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
