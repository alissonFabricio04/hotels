import { Request, Response } from "express"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import StrategyErrors from "../../errors/StrategyErrors"
import GetHotelsByPeriod from "../../app/use-cases/GetHotelsByPeriod"
import HotelRepositoryImpl from "../repositories/HotelRepositoryImpl"

export default class GetHotelsByPeriodController {
  private databaseConnection: IDatabaseConnection
  private useCase: GetHotelsByPeriod

  constructor() {
    this.databaseConnection = databaseConnection
    this.useCase = new GetHotelsByPeriod(
      new HotelRepositoryImpl(this.databaseConnection),
      new RoomRepositoryImpl(this.databaseConnection)
    )
  }

  async handle(req: Request, res: Response) {
    try {
      const output = await this.useCase.handle(req.query.checkIn as string, req.query.checkOut as string)
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
