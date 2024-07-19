import { Request, Response } from "express"
import CreateReserve from "../../app/use-cases/CreateReserve"
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection"
import NotificationQueueImpl from "../queue/NotificationQueueImpl"
import ReserveRepositoryImpl from "../repositories/ReserveRepositoryImpl"
import RoomRepositoryImpl from "../repositories/RoomRepositoryImpl"
import StrategyErrors from "../../errors/StrategyErrors"

export default class CreateReserveController {
  private databaseConnection: IDatabaseConnection
  private useCase: CreateReserve

  constructor() {
    this.databaseConnection = databaseConnection
    this.useCase = new CreateReserve(
      new RoomRepositoryImpl(this.databaseConnection),
      new ReserveRepositoryImpl(this.databaseConnection),
      new NotificationQueueImpl()
    )
  }

  async handle(req: Request, res: Response) {
    try {
      await this.useCase.handle(req.body)
      return res
        .status(201)
        .json({ message: 'Reserva feita com sucesso' })
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
