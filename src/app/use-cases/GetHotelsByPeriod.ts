import Hotel from "../../domain/Hotel"
import Period from "../../domain/Period"
import InternalServerError from "../../errors/InternalServerError"
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
    capacity: number
  }[]
}

type Output = {
  hotels: HotelDTO[]
}

export default class GetHotelsByPeriod {
  constructor(
    private hotelRepository: HotelRepository,
    private roomRepository: RoomRepository
  ) { }

  async handle(checkIn: string, checkOut: string): Promise<Output> {
    const period = Period.instanceStr(checkIn, checkOut)

    const rms = await this.roomRepository.getByPeriod(period)

    let currentHotelIndex = -1
    let currentHotelId = ''
    const hotels: HotelDTO[] = []

    for (let i = 0; i < rms.length; i++) {
      const currentRoom = rms[i]

      if (hotels.length === 0 || currentRoom.getHotelId().getValue() !== currentHotelId) {
        const hotel = await this.hotelRepository.getById(currentRoom.getHotelId())
        if (!hotel) throw new InternalServerError('Erro ao buscar hotéis')
        currentHotelIndex = this.nextHotel(currentHotelIndex, currentHotelId, hotels, hotel)
      }

      hotels[currentHotelIndex].rooms.push({
        roomId: currentRoom.getId().getValue(),
        roomNumber: currentRoom.getRoomNumber().getValue(),
        status: currentRoom.getStatus().getName(),
        capacity: currentRoom.getCapacity().getValue()
      })
    }

    return {
      hotels
    }
  }

  private nextHotel(currentHotelIndex: number, currentHotelId: string, hotels: HotelDTO[], nextHotel: Hotel) {
    currentHotelId = nextHotel.getId().getValue()
    this.pushHotel(hotels, nextHotel)
    return currentHotelIndex + 1
  }

  private pushHotel(hotels: HotelDTO[], hotel: Hotel) {
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
      rooms: []
    })
  }
}
