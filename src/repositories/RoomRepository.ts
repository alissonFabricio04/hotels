import Room from "../entities/Room";

export default interface RoomRepository {
  getById: (roomsId: string[]) => Promise<Room[]>
  theseRoomAvailableIn: (roomsId: string[], checkIn: Date, checkOut: Date) => Promise<boolean>
}