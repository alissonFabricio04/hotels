import { UUId } from "../../domain/Id";
import UnprocessableEntity from "../../errors/UnprocessableEntity";
import RoomRepository from "../repositories/RoomRepository";

type Input = {
  room01Id: string
  room02Id: string
}

type Output = {
  bestChoiseId: string
}

export default class CompareHotelsByPrice {
  constructor(private roomRepository: RoomRepository) { }

  async handle(input: Input): Promise<Output> {
    const room01 = await this.roomRepository.getById(UUId.restore(input.room01Id))
    if (!room01) throw new UnprocessableEntity('Quarto não encontrado')

    const room02 = await this.roomRepository.getById(UUId.restore(input.room02Id))
    if (!room02) throw new UnprocessableEntity('Quarto não encontrado')

    if (room01.getDailyPrice() < room02.getDailyPrice()) {
      return {
        bestChoiseId: room01.getId().getValue()
      }
    }

    return {
      bestChoiseId: room02.getId().getValue()
    }
  }
}