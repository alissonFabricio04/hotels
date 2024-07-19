import { Request, Response } from "express"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import StrategyErrors from "../../errors/StrategyErrors"
import CompareHotelsByPrice from "../../app/use-cases/CompareHotelsByPrice"

export default class CompareHotelsByPriceController {
  private databaseConnection: IDatabaseConnection
  private useCase: CompareHotelsByPrice

  constructor() {
    this.databaseConnection = databaseConnection
    this.useCase = new CompareHotelsByPrice(
      new RoomRepositoryImpl(this.databaseConnection)
    )
  }

  async handle(req: Request, res: Response) {
    try {
      const output = await this.useCase.handle(req.body)
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
