import env from '../config/env'

import { describe, expect, test } from 'vitest'

describe('This test suite is exclusive for get/search hotels through API', () => {
  test('should be able search hotels through destinations', async () => {
    const destination = 'Pinheiros'

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${env.SELF_HOST}/hotels?destination=${destination}`, {
      headers
    })
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
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 123,
            statusId: 1,
            capacity: 4
          },
          {
            roomId: 'ee851e24-6301-485a-b354-744078906b44',
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 321,
            statusId: 2,
            capacity: 2
          }
        ]
      }
    ])
  })

  test('should be able search hotels through period', async () => {
    const checkIn = '2024-07-05T12:00:00.000Z'
    const checkOut = '2024-07-07T12:00:00.000Z'

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${env.SELF_HOST}/hotels?period=${checkIn}_to_${checkOut}`, {
      headers
    })
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
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 123,
            statusId: 1,
            capacity: 4
          }
        ]
      }
    ])
  })

  test('should be able search hotels through capacity', async () => {
    const capacity = 3

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${env.SELF_HOST}/hotels?capacity=${capacity}`, {
      headers
    })
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
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 123,
            statusId: 1,
            capacity: 4
          }
        ]
      }
    ])
  })

  test('should be able get all hotels', async () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const response = await fetch(`${env.SELF_HOST}/hotels`, {
      headers
    })
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
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 123,
            statusId: 1,
            capacity: 4
          },
          {
            roomId: 'ee851e24-6301-485a-b354-744078906b44',
            hotelId: '53db08c8-8a64-4716-8079-4043af363924',
            roomNumber: 321,
            statusId: 2,
            capacity: 2
          }
        ]
      }
    ])
  })
})