import { databaseConnection } from '../infra/database/DatabaseConnection'

export async function SetupDatabase() {
  await ClearWholeDatabase()
  await PopulateDatabase()
}

export async function PopulateDatabase() {
  try {
    await databaseConnection.paymentMethods.createMany({ data: paymentMethods, skipDuplicates: true })
    await databaseConnection.hotels.createMany({ data: hotels, skipDuplicates: true })
    await databaseConnection.roomStatus.createMany({ data: roomStatus, skipDuplicates: true })
    await databaseConnection.rooms.createMany({ data: rooms, skipDuplicates: true })
    await databaseConnection.reserves.createMany({ data: reserves, skipDuplicates: true })
    await databaseConnection.reservesRooms.createMany({ data: reservesRooms, skipDuplicates: true })
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    await databaseConnection.$disconnect()
  }
}

export async function ClearWholeDatabase() {
  try {
    await databaseConnection.reservesRooms.deleteMany()
    await databaseConnection.rooms.deleteMany()
    await databaseConnection.roomStatus.deleteMany()
    await databaseConnection.reserves.deleteMany()
    await databaseConnection.paymentMethods.deleteMany()
    await databaseConnection.hotels.deleteMany()
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    await databaseConnection.$disconnect()
  }
}

type Room = {
  roomId: string
  roomNumber: number
  hotelId: string
  statusId: number
  capacity: number
  dailyPrice: number
}

type Reserve = {
  reserveId: string
  name: string
  email: string
  paymentMethodId: number
  checkIn: string
  checkOut: string
  qtyOfGuests: number
  totalPrice: number
}

type ReserveRoom = {
  id: string
  reserveId: string
  roomId: string
}

const hotels = [
  {
    hotelId: '53db08c8-8a64-4716-8079-4043af363924',
    name: 'Hotel 1',
    lat: -23.598206229898025,
    long: -46.683235121755615,
    zip: '05425-030',
    address: 'Rua Capri',
    number: 145,
    complement: null,
    city: 'Pinheiros',
    state: 'São Paulo',
    country: 'Brasil'
  }
]

const rooms: Room[] = [
  {
    roomId: '1db7f169-f8d5-4823-b1ee-d70fd383ad73',
    hotelId: '53db08c8-8a64-4716-8079-4043af363924',
    roomNumber: 123,
    statusId: 1,
    capacity: 4,
    dailyPrice: 40
  },
  {
    roomId: 'ee851e24-6301-485a-b354-744078906b44',
    hotelId: '53db08c8-8a64-4716-8079-4043af363924',
    roomNumber: 321,
    statusId: 2,
    capacity: 2,
    dailyPrice: 20
  }
]

const reserves: Reserve[] = [
  {
    reserveId: '2442b71d-4daa-461f-be17-baebdf45f612',
    name: 'john.doe@email.com',
    email: 'john.doe@email.com',
    paymentMethodId: 1,
    checkIn: '2024-07-05T12:00:00.000Z',
    checkOut: '2024-07-07T12:00:00.000Z',
    qtyOfGuests: 2,
    totalPrice: 40
  }
]

const reservesRooms: ReserveRoom[] = [
  {
    id: 'a89e3ba3-f1c2-415f-bef9-004c1e6bf012',
    reserveId: '2442b71d-4daa-461f-be17-baebdf45f612',
    roomId: 'ee851e24-6301-485a-b354-744078906b44'
  }
]

const paymentMethods = [
  {
    id: 1,
    name: 'Credit card',
    deletedAt: null
  }
]

const roomStatus = [
  { statusId: 1, status: 'free' },
  { statusId: 2, status: 'busy' }
]