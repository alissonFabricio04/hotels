import { IDatabaseConnection } from "../database/DatabaseConnection"
import Room from "../../domain/Room"
import RoomRepository from "../../app/repositories/RoomRepository"
import { UUId } from "../../domain/Id"
import Period from "../../domain/Period"
import Int from "../../domain/Int"

export default class RoomRepositoryImpl implements RoomRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getById(id: UUId): Promise<Room | null> {
    const roomsRaw = await this.databaseConnection.rooms.findUnique({
      where: {
        roomId: id.getValue()
      }
    })

    if (!roomsRaw) return null

    return Room.restore(
      roomsRaw.roomId,
      roomsRaw.roomNumber,
      roomsRaw.hotelId,
      roomsRaw.statusId,
      roomsRaw.capacity,
      roomsRaw.dailyPrice.toNumber()
    )
  }

  async getByHotelId(hotelId: UUId): Promise<Room[]> {
    const roomsRaw = await this.databaseConnection.rooms.findMany({
      where: {
        hotelId: hotelId.getValue()
      }
    })

    const rooms = roomsRaw.map(r => Room.restore(
      r.roomId,
      r.roomNumber,
      r.hotelId,
      r.statusId,
      r.capacity,
      r.dailyPrice.toNumber()
    ))

    return rooms
  }

  async getByPeriod(period: Period): Promise<Room[]> {
    const availableRooms = await this.databaseConnection.rooms.findMany({
      where: {
        reservesRooms: {
          none: {
            reserves: {
              OR: [
                {
                  checkIn: {
                    lt: period.getCheckOut() // Check-in da reserva é antes do check-out solicitado
                  },
                  checkOut: {
                    gt: period.getCheckIn() // Check-out da reserva é depois do check-in solicitado
                  }
                }
              ]
            }
          }
        }
      }
    })

    const rooms = availableRooms.map(r => Room.restore(
      r.roomId,
      r.roomNumber,
      r.hotelId,
      r.statusId,
      r.capacity,
      r.dailyPrice.toNumber()
    ))

    return rooms
  }

  async getByRoomCapacity(capacity: Int): Promise<Room[]> {
    const roomsRaw = await this.databaseConnection.rooms.findMany({
      where: {
        capacity: {
          gte: capacity.getValue()
        }
      }
    })

    const rooms = roomsRaw.map(r => Room.restore(
      r.roomId,
      r.roomNumber,
      r.hotelId,
      r.statusId,
      r.capacity,
      r.dailyPrice.toNumber()
    ))

    return rooms
  }

  async areAvailable(ids: UUId[], period: Period): Promise<Room[]> {
    const roomsId = ids.map(id => id.getValue())

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
                    lt: period.getCheckOut(), // Check-in da reserva é antes do check-out solicitado
                  },
                  checkOut: {
                    gt: period.getCheckIn(), // Check-out da reserva é depois do check-in solicitado
                  }
                }
              ]
            }
          }
        }
      }
    })

    return availableRooms.map(r => Room.restore(
      r.roomId,
      r.roomNumber,
      r.hotelId,
      r.statusId,
      r.capacity,
      r.dailyPrice.toNumber()
    ))
  }
}
