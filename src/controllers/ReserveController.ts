import { Request, Response } from "express"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import PaymentMethodRepositoryImpl from "../repositories/PaymentMethodRepositoryImpl"
import ReserveRepositoryImpl from "../repositories/ReserveRepositoryImpl"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import ReserveService from "../services/ReserveService"
import StrategyErrors from "../errors/StrategyErrors"

export default class ReserveController {
  private databaseConnection: IDatabaseConnection
  private reserveService: ReserveService

  constructor() {
    this.databaseConnection = databaseConnection
    this.reserveService = new ReserveService(
      new PaymentMethodRepositoryImpl(this.databaseConnection),
      new RoomRepositoryImpl(this.databaseConnection),
      new ReserveRepositoryImpl(this.databaseConnection)
    )
  }

  async createReserve(req: Request, res: Response) {
    try {
      const { reserveId } = await this.reserveService.createReserve(req.body)
      return res
        .status(201)
        .json({ reserveId })
        .end()
    } catch (e) {
      const error = (e as Error)

      console.log(error.message)

      return res
        .status(StrategyErrors(error))
        .json({ message: error.message })
        .end()
    } finally {
      await this.databaseConnection.$disconnect()
    }
  }

  async getReserve(req: Request, res: Response) {
    try {
      const reserve = await this.reserveService.getReserve(req.params.reserveId)
      return res
        .status(200)
        .json({ reserve })
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