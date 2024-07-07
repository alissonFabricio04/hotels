/*
  Warnings:

  - You are about to alter the column `lat` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `long` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The primary key for the `Rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomId` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Rooms` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReservesRooms" DROP CONSTRAINT "ReservesRooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_statusId_fkey";

-- AlterTable
ALTER TABLE "Hotels" ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "long" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_pkey",
DROP COLUMN "roomId",
DROP COLUMN "statusId",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL,
ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY ("room_id");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "RoomStatus"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservesRooms" ADD CONSTRAINT "ReservesRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
