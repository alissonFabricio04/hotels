import env from '../config/env'

import express, { Request, Response } from 'express'
import { ClearWholeDatabase, PopulateDatabase } from '../utils/seedDatabase'
import HotelController from '../controllers/HotelController'
import ReserveController from '../controllers/ReserveController'

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

app.get('/hotels', (req: Request, res: Response) => new HotelController().getHotels(req, res))
app.post('/create-reserve', (req: Request, res: Response) => new ReserveController().createReserve(req, res))
app.get('/reserve/:reserveId', (req: Request, res: Response) => new ReserveController().getReserve(req, res))

app.listen(env.SELF_PORT, () => {
  console.log(`Server is running on ${env.SELF_PORT}`)
})