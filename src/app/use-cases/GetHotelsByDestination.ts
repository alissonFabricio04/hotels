import UnprocessableEntity from "../../errors/UnprocessableEntity"
import HotelRepository from "../repositories/HotelRepository"
import RoomRepository from "../repositories/RoomRepository"

type HotelDTO = {
  hotelId: string,
  name: string,
  location: {
    lat: number
    long: number
  },
  zip: string,
  address: string,
  number: number,
  complement: string | null,
  city: string,
  state: string,
  country: string
  rooms: {
    roomId: string,
    roomNumber: number,
    status: string,
    capacity: number,
    dailyPrice: number
  }[]
}

type Output = {
  hotels: HotelDTO[]
}

export default class GetHotelsByDestination {
  constructor(
    private hotelRepository: HotelRepository,
    private roomRepository: RoomRepository
  ) { }

  async handle(destination: string): Promise<Output> {
    if (!destination || typeof destination !== 'string' || destination.length <= 0) {
      throw new UnprocessableEntity('Destino não informado')
    }

    const hts = await this.hotelRepository.getByDestination(destination)

    const hotels: HotelDTO[] = []

    for (let i = 0; i < hts.length; i++) {
      const hotel = hts[i]
      const rms = await this.roomRepository.getByHotelId(hotel.getId())

      const rooms = rms.map(r => ({
        roomId: r.getId().getValue(),
        roomNumber: r.getRoomNumber().getValue(),
        status: r.getStatus().getName(),
        capacity: r.getCapacity().getValue(),
        dailyPrice: r.getDailyPrice().getValue()
      }))

      hotels.push({
        hotelId: hotel.getId().getValue(),
        name: hotel.getName(),
        location: {
          lat: hotel.getLocation().getLat(),
          long: hotel.getLocation().getLong()
        },
        zip: hotel.getZip(),
        address: hotel.getAddress(),
        number: hotel.getNumber(),
        complement: hotel.getComplement(),
        city: hotel.getCity(),
        state: hotel.getState(),
        country: hotel.getCountry(),
        rooms
      })
    }

    return {
      hotels
    }
  }
}
