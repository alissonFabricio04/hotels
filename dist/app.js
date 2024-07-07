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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConnection_1 = require("./databaseConnection");
const env_1 = __importDefault(require("./env"));
const express_1 = __importDefault(require("express"));
const seedDatabase_1 = require("./seedDatabase");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/clear-database', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seedDatabase_1.ClearWholeDatabase)();
    return res.send('cleaning finished').end();
}));
app.get('/seed-database', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seedDatabase_1.PopulateDatabase)();
    return res.send('seed finished').end();
}));
app.get('/hotels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { destination } = req.query;
    const filters = {};
    if (destination) {
        filters.city = {
            search: destination
        };
    }
    const hotelsData = yield databaseConnection_1.prisma.hotels.findMany({
        where: filters,
        include: {
            Rooms: true
        }
    });
    const hotels = hotelsData.map(h => ({
        hotelId: h.hotelId,
        name: h.name,
        lat: h.lat.toNumber(),
        long: h.long.toNumber(),
        zip: h.zip,
        address: h.address,
        number: h.number,
        complement: h.complement,
        city: h.city,
        state: h.state,
        country: h.country,
        rooms: h.Rooms.map(r => ({
            roomId: r.roomId,
            roomNumber: r.roomNumber,
            status: r.statusId
        }))
    }));
    console.log(hotels);
    return res.status(200).json({ hotels });
}));
app.listen(env_1.default.SELF_PORT, () => {
    console.log(`Server is running on ${env_1.default.SELF_PORT}`);
});
