import { IDatabaseConnection } from "../database/DatabaseConnection";
import Room from "../entities/Room";
import RoomRepository from "./RoomRepository";

export default class RoomRepositoryImpl implements RoomRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getById(roomsId: string[]): Promise<Room[]> {
    const rooms = await this.databaseConnection.rooms.findMany({
      where: {
        roomId: {
          in: roomsId
        }
      }
    })

    return rooms
  }

  async theseRoomAvailableIn(roomsId: string[], checkIn: Date, checkOut: Date): Promise<boolean> {
    const availableRooms = await this.databaseConnection.rooms.findMany({
      where: {
        roomId: {
          in: roomsId,
        },
        reservesRooms: {
          none: {
            reserves: {
              OR: [
                {
                  checkIn: {
                    lt: checkOut, // Check-in da reserva é antes do check-out solicitado
                  },
                  checkOut: {
                    gt: checkIn, // Check-out da reserva é depois do check-in solicitado
                  }
                }
              ]
            }
          }
        }
      }
    })

    return availableRooms.length === roomsId.length
  }
}