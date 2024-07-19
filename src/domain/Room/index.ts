import Double from "../Double"
import { UUId } from "../Id"
import Int from "../Int"
import RoomStatus, { RoomStatusFactory } from "../RoomStatus"

export default class Room {
  private constructor(
    private roomId: UUId,
    private roomNumber: Int,
    private hotelId: UUId,
    private status: RoomStatus,
    private capacity: Int,
    private dailyPrice: Double
  ) { }

  static create(roomNumber: number, hotelId: UUId, capacity: number, dailyPrice: number) {
    const status = RoomStatusFactory
      .createByName('free')
      .instance()

    return new Room(
      UUId.create(),
      new Int(roomNumber),
      hotelId,
      status,
      new Int(capacity),
      new Double(dailyPrice)
    )
  }

  static restore(
    roomId: string,
    roomNumber: number,
    hotelId: string,
    statusId: number,
    capacity: number,
    dailyPrice: number
  ) {
    const status = RoomStatusFactory
      .createById(statusId)
      .instance()

    return new Room(
      UUId.restore(roomId),
      new Int(roomNumber),
      UUId.restore(hotelId),
      status,
      new Int(capacity),
      new Double(dailyPrice)
    )
  }

  getId() {
    return this.roomId
  }

  getRoomNumber() {
    return this.roomNumber
  }

  getHotelId() {
    return this.hotelId
  }

  getStatus() {
    return this.status
  }

  getCapacity() {
    return this.capacity
  }

  getDailyPrice() {
    return this.dailyPrice
  }
}
