import Hotel from "../entities/Hotel"
import { IDatabaseConnection } from "../database/DatabaseConnection"
import HotelRepository from "./HotelsRepository"

export default class HotelRepositoryImpl implements HotelRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getHotels(): Promise<Hotel[]> {
    const allHotels = await this.databaseConnection.hotels.findMany({
      include: {
        Rooms: true
      }
    })

    return allHotels.map(h => ({
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
        hotelId: h.hotelId,
        roomNumber: r.roomNumber,
        statusId: r.statusId,
        capacity: r.capacity,
      }))
    }))
  }

  async getHotelsByDestination(destination: string): Promise<Hotel[]> {
    const hotelsInCity = await this.databaseConnection.hotels.findMany({
      where: {
        city: {
          search: destination
        }
      },
      include: {
        Rooms: true
      }
    })

    return hotelsInCity.map(h => ({
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
        hotelId: h.hotelId,
        roomNumber: r.roomNumber,
        statusId: r.statusId,
        capacity: r.capacity,
      }))
    }))
  }

  async getHotelsByPeriod(checkIn: Date, checkOut: Date): Promise<Hotel[]> {
    const availableRooms = await this.databaseConnection.rooms.findMany({
      where: {
        reservesRooms: {
          none: {
            reserves: {
              OR: [
                {
                  checkIn: {
                    lt: checkOut // Check-in da reserva é antes do check-out solicitado
                  },
                  checkOut: {
                    gt: checkIn // Check-out da reserva é depois do check-in solicitado
                  }
                }
              ]
            }
          }
        }
      },
      include: {
        hotels: true,
      },
    })

    const hotels: Hotel[] = []
    const currentHotelIndex = 0
    availableRooms.map(r => {
      if (!hotels[currentHotelIndex]) {
        hotels.push({
          hotelId: r.hotels.hotelId,
          name: r.hotels.name,
          lat: r.hotels.lat,
          long: r.hotels.long,
          zip: r.hotels.zip,
          address: r.hotels.address,
          number: r.hotels.number,
          complement: r.hotels.complement,
          city: r.hotels.city,
          state: r.hotels.state,
          country: r.hotels.country,
          rooms: []
        })
      }

      hotels[currentHotelIndex].rooms.push({
        roomId: r.roomId,
        hotelId: r.hotelId,
        roomNumber: r.roomNumber,
        statusId: r.statusId,
        capacity: r.capacity,
      })
    })

    return hotels
  }

  async getHotelsByRoomCapacity(capacity: number): Promise<Hotel[]> {
    const rooms = await this.databaseConnection.rooms.findMany({
      where: {
        capacity: {
          gte: capacity
        }
      },
      include: {
        hotels: true
      }
    })

    const hotels: Hotel[] = []
    const currentHotelIndex = 0
    rooms.map(r => {
      if (!hotels[currentHotelIndex]) {
        hotels.push({
          hotelId: r.hotels.hotelId,
          name: r.hotels.name,
          lat: r.hotels.lat,
          long: r.hotels.long,
          zip: r.hotels.zip,
          address: r.hotels.address,
          number: r.hotels.number,
          complement: r.hotels.complement,
          city: r.hotels.city,
          state: r.hotels.state,
          country: r.hotels.country,
          rooms: []
        })
      }

      hotels[currentHotelIndex].rooms.push({
        roomId: r.roomId,
        hotelId: r.hotelId,
        roomNumber: r.roomNumber,
        statusId: r.statusId,
        capacity: r.capacity,
      })
    })

    return hotels
  }
}