/*
  Warnings:

  - You are about to drop the column `saldo` on the `saldo` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `saldo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "saldo" DROP COLUMN "saldo",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
