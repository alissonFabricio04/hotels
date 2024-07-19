import { Request, Response } from "express"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import StrategyErrors from "../../errors/StrategyErrors"
import CompareHotelsByLocation from "../../app/use-cases/CompareHotelsByLocation"
import HotelRepositoryImpl from "../repositories/HotelRepositoryImpl"

export default class CompareHotelsByLocationController {
  private databaseConnection: IDatabaseConnection
  private useCase: CompareHotelsByLocation

  constructor() {
    this.databaseConnection = databaseConnection
    this.useCase = new CompareHotelsByLocation(
      new RoomRepositoryImpl(this.databaseConnection),
      new HotelRepositoryImpl(this.databaseConnection)
    )
  }

  async handle(req: Request, res: Response) {
    try {
      const input = {
        point: {
          lat: parseFloat(req.query.pointLat as string),
          long: parseFloat(req.query.pointLong as string),
        },
        room01Id: req.query.room01Id as string,
        room02Id: req.query.room02Id as string
      }
      const output = await this.useCase.handle(input)
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
