import { UUId } from "../../domain/Id"
import Int from "../../domain/Int"
import Period from "../../domain/Period"
import Room from "../../domain/Room"

export default interface RoomRepository {
  getById: (id: UUId) => Promise<Room | null>
  getByHotelId: (hotelId: UUId) => Promise<Room[]>
  getByPeriod: (period: Period) => Promise<Room[]>
  getByRoomCapacity: (capacity: Int) => Promise<Room[]>
  areAvailable: (ids: UUId[], period: Period) => Promise<Room[]>
}
