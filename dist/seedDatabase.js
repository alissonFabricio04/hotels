"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupDatabase = SetupDatabase;
exports.PopulateDatabase = PopulateDatabase;
exports.ClearWholeDatabase = ClearWholeDatabase;
const databaseConnection_1 = require("./databaseConnection");
function SetupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ClearWholeDatabase();
        yield PopulateDatabase();
    });
}
function PopulateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { paymentMethods, hotels } = data;
            const rooms = [];
            const reserves = [];
            const reservesRooms = [];
            const roomStatus = [
                { statusId: 1, status: 'free' },
                { statusId: 2, status: 'busy' }
            ];
            // await prisma.$transaction([
            // await Promise.all([
            // console.log(
            //   await prisma.paymentMethods.createMany({ data: paymentMethods }),
            //   await prisma.hotels.createMany({ data: hotels }),
            //   await prisma.roomStatus.createMany({ data: roomStatus }),
            //   await prisma.rooms.createMany({ data: rooms }),
            //   await prisma.reserves.createMany({ data: reserves }),
            //   await prisma.reservesRooms.createMany({ data: reservesRooms }),
            // )
            // ])
            yield databaseConnection_1.prisma.rooms.create({
                data: rooms[0]
            });
            // await prisma.reserves.createMany({ data: reserves })
            // await prisma.reservesRooms.createMany({ data: reservesRooms })
        }
        catch (error) {
            console.log(error.message);
        }
        finally {
            yield databaseConnection_1.prisma.$disconnect();
        }
    });
}
function ClearWholeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await prisma.$transaction([
            yield Promise.all([
                databaseConnection_1.prisma.paymentMethods.deleteMany(),
                databaseConnection_1.prisma.reserves.deleteMany(),
                databaseConnection_1.prisma.rooms.deleteMany(),
                databaseConnection_1.prisma.reservesRooms.deleteMany(),
                databaseConnection_1.prisma.roomStatus.deleteMany(),
                databaseConnection_1.prisma.hotels.deleteMany()
            ]);
        }
        catch (error) {
            console.log(error.message);
        }
        finally {
            yield databaseConnection_1.prisma.$disconnect();
        }
    });
}
const data = {
    hotels: [
        {
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            name: 'Hotel 1',
            lat: -23.598206229898025,
            long: -46.683235121755615,
            zip: '05425-030',
            address: 'Rua Capri',
            number: 145,
            complement: null,
            city: 'Pinheiros',
            state: 'São Paulo',
            country: 'Brasil',
        }
    ],
    rooms: [
        {
            roomId: '1db7f169-f8d5-4823-b1ee-d70fd383ad73',
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 123,
            status: 1
        },
        {
            roomId: 'ee851e24-6301-485a-b354-744078906b44',
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 321,
            status: 2
        }
    ],
    reserves: [
        {
            reserveId: '2442b71d-4daa-461f-be17-baebdf45f612',
            name: 'john.doe@email.com',
            email: 'john.doe@email.com',
            telephone: '+99 (99) 99999-9999',
            paymentMethodId: 1,
            roomsId: ['ee851e24-6301-485a-b354-744078906b44'],
            checkIn: '2024-07-05T12:00:00.000Z',
            checkOut: '2024-07-07T12:00:00.000Z',
            qtyOfGuests: 2
        }
    ],
    paymentMethods: [
        {
            id: 1,
            name: 'Credit card',
            deletedAt: null
        }
    ]
};
