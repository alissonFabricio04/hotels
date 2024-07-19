/*
  Warnings:

  - Added the required column `totalPrice` to the `Reserves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserves" ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL;
