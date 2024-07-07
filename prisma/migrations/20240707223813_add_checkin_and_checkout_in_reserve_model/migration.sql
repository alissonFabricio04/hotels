/*
  Warnings:

  - Added the required column `checkIn` to the `Reserves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Reserves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtyOfGuests` to the `Reserves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserves" ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "qtyOfGuests" INTEGER NOT NULL;
