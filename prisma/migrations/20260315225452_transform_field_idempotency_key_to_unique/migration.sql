/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey]` on the table `Deposito` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Deposito_idempotencyKey_key" ON "Deposito"("idempotencyKey");
