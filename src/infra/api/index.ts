import env from '../config/env'

import express, { Request, Response } from 'express'
import { ClearWholeDatabase, PopulateDatabase } from '../../utils/seedDatabase'
import CompareHotelsByLocationController from '../controllers/CompareHotelsByLocationController'
import CompareHotelsByPriceController from '../controllers/CompareHotelsByPriceController'
import CreateReserveController from '../controllers/CreateReserveController'
import GetHotelsByCapacityController from '../controllers/GetHotelsByCapacityController'
import GetHotelsByDestinationController from '../controllers/GetHotelsByDestinationController'
import GetHotelsByPeriodController from '../controllers/GetHotelsByPeriodController'

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

app.get('/hotels/compare/location', (req: Request, res: Response) => new CompareHotelsByLocationController().handle(req, res))
app.get('/hotels/compare/price', (req: Request, res: Response) => new CompareHotelsByPriceController().handle(req, res))

app.get('/hotels/filter/capacity', (req: Request, res: Response) => new GetHotelsByCapacityController().handle(req, res))
app.get('/hotels/filter/destination', (req: Request, res: Response) => new GetHotelsByDestinationController().handle(req, res))
app.get('/hotels/filter/period', (req: Request, res: Response) => new GetHotelsByPeriodController().handle(req, res))

app.post('/reserves/create', (req: Request, res: Response) => new CreateReserveController().handle(req, res))

app.listen(env.SELF_PORT, () => {
  console.log(`Server is running on ${env.SELF_PORT}`)
})