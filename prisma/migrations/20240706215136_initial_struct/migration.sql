-- CreateTable
CREATE TABLE "Rooms" (
    "roomId" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Hotels" (
    "hotel_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "RoomStatus" (
    "status_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "RoomStatus_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "ReservesRooms" (
    "id" TEXT NOT NULL,
    "reserve_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "ReservesRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserves" (
    "reserve_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "payment_method_id" INTEGER NOT NULL,

    CONSTRAINT "Reserves_pkey" PRIMARY KEY ("reserve_id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomStatus_status_key" ON "RoomStatus"("status");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RoomStatus"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservesRooms" ADD CONSTRAINT "ReservesRooms_reserve_id_fkey" FOREIGN KEY ("reserve_id") REFERENCES "Reserves"("reserve_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservesRooms" ADD CONSTRAINT "ReservesRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserves" ADD CONSTRAINT "Reserves_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
