import { Request, Response } from "express"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import StrategyErrors from "../../errors/StrategyErrors"
import GetHotelsByCapacity from "../../app/use-cases/GetHotelsByCapacity"
import HotelRepositoryImpl from "../repositories/HotelRepositoryImpl"

export default class GetHotelsByCapacityController {
  private databaseConnection: IDatabaseConnection
  private useCase: GetHotelsByCapacity

  constructor() {
    this.databaseConnection = databaseConnection
    this.useCase = new GetHotelsByCapacity(
      new HotelRepositoryImpl(this.databaseConnection),
      new RoomRepositoryImpl(this.databaseConnection)
    )
  }

  async handle(req: Request, res: Response) {
    try {
      const output = await this.useCase.handle(Number(req.query.capacity))
      return res
        .status(200)
        .json(output)
        .end()
    } catch (e) {
      const error = (e as Error)

      return res
        .status(StrategyErrors(error))
        .json({ message: error.message })
        .end()
    } finally {
      await this.databaseConnection.$disconnect()
    }
  }
}
