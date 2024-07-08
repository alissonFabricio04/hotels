/*
  Warnings:

  - You are about to drop the column `telephone` on the `Reserves` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserves" DROP COLUMN "telephone";

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "capacity" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Hotels_city_idx" ON "Hotels"("city");

-- CreateIndex
CREATE INDEX "Reserves_checkIn_checkOut_idx" ON "Reserves"("checkIn", "checkOut");

-- CreateIndex
CREATE INDEX "Rooms_capacity_idx" ON "Rooms"("capacity");
