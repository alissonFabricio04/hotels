import env from './env'

import { expect, test } from 'vitest'

test('should be able search hotels through destinations', async () => {
  const response = await fetch(`${env.SELF_HOST}/hotels?destination=Pinheiros`)
  const responseBody = await response.json()

  expect(response.status).toStrictEqual(200)
  expect(responseBody.hotels).toStrictEqual([
    {
      hotelId: '53db08c8-8a64-4716-8079-4043af363924',
      name: 'Hotel 1',
      lat: -23.59820622989803,
      long: -46.68323512175562,
      zip: '05425-030',
      address: 'Rua Capri',
      number: 145,
      complement: null,
      city: 'Pinheiros',
      state: 'São Paulo',
      country: 'Brasil',
      rooms: [
        {
          roomId: '1db7f169-f8d5-4823-b1ee-d70fd383ad73',
          roomNumber: 123,
          status: 1
        },
        {
          roomId: 'ee851e24-6301-485a-b354-744078906b44',
          roomNumber: 321,
          status: 2
        }
      ]
    }
  ])
})
