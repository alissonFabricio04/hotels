import { prisma } from './databaseConnection'
import env from './env'
import express, { Request, Response } from 'express'
import { ClearWholeDatabase, PopulateDatabase } from './seedDatabase'

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

app.get('/hotels', async (req: Request, res: Response) => {
  const { destination } = req.query
  const filters: any = {}

  if (destination) {
    filters.city = {
      search: destination
    }
  }

  const hotelsData = await prisma.hotels.findMany({
    where: filters,
    include: {
      Rooms: true
    }
  })

  const hotels = hotelsData.map(h => ({
    hotelId: h.hotelId,
    name: h.name,
    lat: h.lat.toNumber(),
    long: h.long.toNumber(),
    zip: h.zip,
    address: h.address,
    number: h.number,
    complement: h.complement,
    city: h.city,
    state: h.state,
    country: h.country,
    rooms: h.Rooms.map(r => ({
      roomId: r.roomId,
      roomNumber: r.roomNumber,
      status: r.statusId
    }))
  }))

  console.log(hotels)
  return res.status(200).json({ hotels })
})

app.listen(env.SELF_PORT, () => {
  console.log(`Server is running on ${env.SELF_PORT}`)
})