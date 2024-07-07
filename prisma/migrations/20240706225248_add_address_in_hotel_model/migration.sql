/*
  Warnings:

  - Added the required column `address` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;
