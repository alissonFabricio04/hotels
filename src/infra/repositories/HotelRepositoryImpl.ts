import Hotel from "../../domain/Hotel"
import { IDatabaseConnection } from "../database/DatabaseConnection"
import HotelRepository from "../../app/repositories/HotelRepository"
import Location from "../../domain/Location"
import { UUId } from "../../domain/Id"

export default class HotelRepositoryImpl implements HotelRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getById(hotelId: UUId): Promise<Hotel | null> {
    const hotelsRaw = await this.databaseConnection.hotels.findUnique({
      where: {
        hotelId: hotelId.getValue()
      }
    })

    if (!hotelsRaw) return null

    return Hotel.restore(
      hotelsRaw.hotelId,
      hotelsRaw.name,
      Location.instance(hotelsRaw.lat, hotelsRaw.long),
      hotelsRaw.zip,
      hotelsRaw.address,
      hotelsRaw.number,
      hotelsRaw.complement,
      hotelsRaw.city,
      hotelsRaw.state,
      hotelsRaw.country
    )
  }

  async getByDestination(destination: string): Promise<Hotel[]> {
    const hotelsInCity = await this.databaseConnection.hotels.findMany({
      where: {
        city: {
          search: destination
        }
      }
    })

    return hotelsInCity.map(h => Hotel.restore(
      h.hotelId,
      h.name,
      Location.instance(h.lat, h.long),
      h.zip,
      h.address,
      h.number,
      h.complement,
      h.city,
      h.state,
      h.country
    ))
  }
}
