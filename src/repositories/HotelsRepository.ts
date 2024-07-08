import Hotel from "../entities/Hotel"

export default interface HotelRepository {
  getHotels: () => Promise<Hotel[]>
  getHotelsByDestination: (destination: string) => Promise<Hotel[]>
  getHotelsByPeriod: (checkIn: Date, checkOut: Date) => Promise<Hotel[]>
  getHotelsByRoomCapacity: (capacity: number) => Promise<Hotel[]>
}