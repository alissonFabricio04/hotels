import { Request, Response } from "express";
import { databaseConnection, IDatabaseConnection } from "../database/DatabaseConnection";
import HotelService from "../services/HotelsService";
import HotelRepositoryImpl from "../repositories/HotelsRepositoryImpl";

export default class HotelController {
  private databaseConnection: IDatabaseConnection
  private hotelService: HotelService

  constructor() {
    this.databaseConnection = databaseConnection
    this.hotelService = new HotelService(new HotelRepositoryImpl(this.databaseConnection))
  }

  async getHotels(req: Request, res: Response) {
    try {
      const hotels = await this.hotelService.getHotels(req.query)
      return res
        .status(200)
        .json({ hotels })
        .end()
    } catch (e) {
      return res
        .status(500)
        .json({ message: (e as Error).message })
        .end()
    } finally {
      await this.databaseConnection.$disconnect()
    }
  }
}