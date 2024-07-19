/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Reserves` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Reserves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserves" DROP COLUMN "totalPrice",
ADD COLUMN     "total_price" DECIMAL(65,30) NOT NULL;
