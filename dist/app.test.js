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
const env_1 = __importDefault(require("./env"));
const vitest_1 = require("vitest");
(0, vitest_1.test)('should be able search hotels through destinations', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${env_1.default.SELF_HOST}/hotels?destination=Pinheiros`);
    const responseBody = yield response.json();
    (0, vitest_1.expect)(response.status).toStrictEqual(200);
    (0, vitest_1.expect)(responseBody.hotels).toStrictEqual([
        {
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            name: 'Hotel 1',
            lat: -23.59820622989803,
            long: -46.68323512175562,
            zip: '05425-030',
            address: 'Rua Capri',
            number: 145,
            complement: null,
            city: 'Pinheiros',
            state: 'São Paulo',
            country: 'Brasil',
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
            ]
        }
    ]);
}));
