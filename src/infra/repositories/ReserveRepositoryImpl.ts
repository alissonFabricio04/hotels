import { IDatabaseConnection } from "../database/DatabaseConnection"
import Reserve from "../../domain/Reserve"
import ReserveRepository from "../../app/repositories/ReserveRepository"
import { UUId } from "../../domain/Id"

export default class ReserveRepositoryImpl implements ReserveRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async save(reserve: Reserve): Promise<void> {
    await this.databaseConnection.$transaction(async tx => {
      const paymentMethodId = reserve
        .getPaymentMethod()
        .getId()
        .getValue()

      await tx.reserves.create({
        data: {
          reserveId: reserve.getReserveId().getValue(),
          name: reserve.getName(),
          email: reserve.getEmail().getValue(),
          checkIn: reserve.getCheckIn().toISOString(),
          checkOut: reserve.getCheckOut().toISOString(),
          qtyOfGuests: reserve.getQtyOfGuests().getValue(),
          paymentMethodId: paymentMethodId.getValue(),
          totalPrice: reserve.getTotalPrice().getValue()
        }
      })

      const reservesRooms = reserve.getRoomsId().map(roomId => ({
        id: UUId.create().getValue(),
        reserveId: reserve.getReserveId().getValue(),
        roomId
      }))

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
      rooms,
      reserveData.totalPrice.toNumber()
    )
  }
}