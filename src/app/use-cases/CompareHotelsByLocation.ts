import { UUId } from "../../domain/Id";
import Location from "../../domain/Location";
import UnprocessableEntity from "../../errors/UnprocessableEntity";
import HotelRepository from "../repositories/HotelRepository";
import RoomRepository from "../repositories/RoomRepository";

type Input = {
  point: {
    lat: number
    long: number
  }
  room01Id: string
  room02Id: string
}

type Output = {
  bestChoiseId: string
}

export default class CompareHotelsByLocation {
  constructor(
    private roomRepository: RoomRepository,
    private hotelRepository: HotelRepository
  ) { }

  async handle(input: Input): Promise<Output> {
    const pointA = Location.instance(input.point.lat, input.point.long)

    const room01 = await this.roomRepository.getById(UUId.restore(input.room01Id))
    if (!room01) throw new UnprocessableEntity('Quarto não encontrado')

    const room02 = await this.roomRepository.getById(UUId.restore(input.room02Id))
    if (!room02) throw new UnprocessableEntity('Quarto não encontrado')

    const hotel01 = await this.hotelRepository.getById(room01.getHotelId())
    if (!hotel01) throw new UnprocessableEntity('Quarto não encontrado')

    const hotel02 = await this.hotelRepository.getById(room02.getHotelId())
    if (!hotel02) throw new UnprocessableEntity('Quarto não encontrado')

    const distance01 = hotel01
      .getLocation()
      .calculateDistance(pointA)

    const distance02 = hotel02
      .getLocation()
      .calculateDistance(pointA)

    if (distance01 < distance02) {
      return {
        bestChoiseId: room01.getId().getValue()
      }
    }

    return {
      bestChoiseId: room02.getId().getValue()
    }
  }
}