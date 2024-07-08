import env from '../config/env'

import { databaseConnection } from '../database/DatabaseConnection'
import express, { Request, Response } from 'express'
import { ClearWholeDatabase, PopulateDatabase } from '../utils/seedDatabase'
import HotelService from '../services/HotelsService'

const app = express()
app.use(express.json())

app.get('/clear-database', async (_, res: Response) => {
  await ClearWholeDatabase()
  return res.send('cleaning finished').end()
})

app.get('/seed-database', async (_, res: Response) => {
  await PopulateDatabase()
  return res.send('seed finished').end()
})

app.get('/hotels', (req: Request, res: Response) => new HotelService(databaseConnection).getHotels(req, res))

app.listen(env.SELF_PORT, () => {
  console.log(`Server is running on ${env.SELF_PORT}`)
})