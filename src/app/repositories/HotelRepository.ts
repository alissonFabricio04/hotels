import Hotel from "../../domain/Hotel"
import { UUId } from "../../domain/Id"

export default interface HotelRepository {
  getById: (hotelId: UUId) => Promise<Hotel | null>
  getByDestination: (destination: string) => Promise<Hotel[]>
}
