import { prisma } from './databaseConnection'

export async function SetupDatabase() {
  await ClearWholeDatabase()
  await PopulateDatabase()
}

export async function PopulateDatabase() {
  try {
    const { paymentMethods, hotels } = data

    const rooms: Room[] = []
    const reserves: Reserve[] = []
    const reservesRooms: ReserveRoom[] = []
    const roomStatus = [
      { statusId: 1, status: 'free' },
      { statusId: 2, status: 'busy' }
    ]

    // await prisma.$transaction([
    // await Promise.all([
    // console.log(
    //   await prisma.paymentMethods.createMany({ data: paymentMethods }),
    //   await prisma.hotels.createMany({ data: hotels }),
    //   await prisma.roomStatus.createMany({ data: roomStatus }),
    //   await prisma.rooms.createMany({ data: rooms }),
    //   await prisma.reserves.createMany({ data: reserves }),
    //   await prisma.reservesRooms.createMany({ data: reservesRooms }),
    // )
    // ])
    await prisma.rooms.create({
      data: rooms[0]
    })
    // await prisma.reserves.createMany({ data: reserves })
    // await prisma.reservesRooms.createMany({ data: reservesRooms })
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    await prisma.$disconnect()
  }
}

export async function ClearWholeDatabase() {
  try {
    // await prisma.$transaction([
    await Promise.all([
      prisma.paymentMethods.deleteMany(),
      prisma.reserves.deleteMany(),
      prisma.rooms.deleteMany(),
      prisma.reservesRooms.deleteMany(),
      prisma.roomStatus.deleteMany(),
      prisma.hotels.deleteMany()
    ])
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    await prisma.$disconnect()
  }
}

type Room = {
  roomId: string
  roomNumber: number
  hotelId: string
  statusId: number
}

type Reserve = {
  reserveId: string
  name: string
  email: string
  telephone: string
  paymentMethodId: number
}

type ReserveRoom = {
  id: string
  reserveId: string
  roomId: string
}

const data = {
  hotels: [
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
      country: 'Brasil',
    }
  ],
  rooms: [
    {
      roomId: '1db7f169-f8d5-4823-b1ee-d70fd383ad73',
      hotelId: '53db08c8-8a64-4716-8079-4043af363924',
      roomNumber: 123,
      status: 1
    },
    {
      roomId: 'ee851e24-6301-485a-b354-744078906b44',
      hotelId: '53db08c8-8a64-4716-8079-4043af363924',
      roomNumber: 321,
      status: 2
    }
  ],
  reserves: [
    {
      reserveId: '2442b71d-4daa-461f-be17-baebdf45f612',
      name: 'john.doe@email.com',
      email: 'john.doe@email.com',
      telephone: '+99 (99) 99999-9999',
      paymentMethodId: 1,
      roomsId: ['ee851e24-6301-485a-b354-744078906b44'],
      checkIn: '2024-07-05T12:00:00.000Z',
      checkOut: '2024-07-07T12:00:00.000Z',
      qtyOfGuests: 2
    }
  ],
  paymentMethods: [
    {
      id: 1,
      name: 'Credit card',
      deletedAt: null
    }
  ]
}