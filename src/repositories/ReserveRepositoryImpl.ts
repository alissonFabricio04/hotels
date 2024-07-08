import { randomUUID } from "crypto";
import { IDatabaseConnection } from "../database/DatabaseConnection";
import Reserve from "../entities/Reserve";
import ReserveRepository from "./ReserveRepository";

export default class ReserveRepositoryImpl implements ReserveRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async save(reserve: Reserve): Promise<void> {
    const reservesRooms = reserve.getRoomsId().map(roomId => ({
      id: randomUUID(),
      reserveId: reserve.getReserveId(),
      roomId
    }))

    await this.databaseConnection.$transaction(async tx => {
      await tx.reserves.create({
        data: {
          reserveId: reserve.getReserveId(),
          name: reserve.getName(),
          email: reserve.getEmail(),
          checkIn: reserve.getCheckIn().toISOString(),
          checkOut: reserve.getCheckOut().toISOString(),
          qtyOfGuests: reserve.getQtyOfGuests(),
          paymentMethodId: reserve.getPaymentMethodId(),
        }
      })

      await tx.reservesRooms.createMany({
        data: reservesRooms
      })
    })
  }

  async getById(reserveId: string): Promise<Reserve | null> {
    const reserveData = await this.databaseConnection.reserves.findUnique({
      where: {
        reserveId
      },
      include: {
        reservesRooms: true
      }
    })

    if (!reserveData) return null

    const rooms = reserveData.reservesRooms.map(r => r.roomId)

    return Reserve.restore(
      reserveData.reserveId,
      reserveData.name,
      reserveData.email,
      reserveData.checkIn,
      reserveData.checkOut,
      reserveData.qtyOfGuests,
      reserveData.paymentMethodId,
      rooms
    )
  }
}