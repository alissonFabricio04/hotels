import Hotel from "../entities/Hotel"
import HotelRepository from "../repositories/HotelsRepository"

export default class HotelService {
  constructor(private hotelRepository: HotelRepository) { }

  async getHotels(query: any): Promise<Hotel[]> {
    const hotels = await this.strategyFilters(query)
    return hotels
  }

  private strategyFilters(filter: any) {
    if (filter['destination']) {
      return this.getHotelsByDestination(filter['destination'])
    }
    else if (filter['period']) {
      const [checkIn, checkOut] = String(filter['period']).split('_to_')
      return this.getHotelsByPeriod(checkIn, checkOut)
    }
    else if (filter['capacity']) {
      const capacity = Number(filter['capacity'])
      return this.getHotelsByRoomCapacity(capacity)
    }
    else {
      return this.getHotelsWithoutFilter()
    }
  }

  private async getHotelsByDestination(destination: string) {
    const hotels = await this.hotelRepository.getHotelsByDestination(destination)
    return hotels
  }

  private async getHotelsByPeriod(checkIn: string, checkOut: string) {
    const hotels = await this.hotelRepository.getHotelsByPeriod(
      new Date(checkIn),
      new Date(checkOut)
    )
    return hotels
  }

  private async getHotelsByRoomCapacity(capacity: number) {
    const hotels = await this.hotelRepository.getHotelsByRoomCapacity(capacity)
    return hotels
  }

  private async getHotelsWithoutFilter() {
    const hotels = await this.hotelRepository.getHotels()
    return hotels
  }
}