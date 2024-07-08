import { Request, Response } from "express"
import { IDatabaseConnection } from "../database/DatabaseConnection"

export default class HotelService {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getHotels(req: Request, res: Response) {
    const filters = this.getFilters(req.query)
    const hotelsData = await this.databaseConnection.hotels.findMany({
      where: filters,
      include: {
        Rooms: true
      }
    })

    const hotels = hotelsData.map(h => ({
      hotelId: h.hotelId,
      name: h.name,
      lat: h.lat,
      long: h.long,
      zip: h.zip,
      address: h.address,
      number: h.number,
      complement: h.complement,
      city: h.city,
      state: h.state,
      country: h.country,
      rooms: h.Rooms.map(r => ({
        roomId: r.roomId,
        roomNumber: r.roomNumber,
        status: r.statusId
      }))
    }))

    return res.status(200).json({ hotels })
  }

  private getFilters(query: any) {
    const allPossibleFilters = [
      {
        filter: 'destination',
        search: 'city'
      }
    ]

    const filters: { [key: string]: { search: string } } = {}
    for (let i = 0; i < allPossibleFilters.length; i++) {
      const filter = query[allPossibleFilters[i].filter]
      if (filter) {
        filters[allPossibleFilters[i].search] = {
          search: filter
        }
      }
    }

    return filters
  }
}