import env from '../config/env'

import { describe, expect, test } from 'vitest'
import GenRandomCheckInAndOut from '../utils/GenRandomCheckInAndOut'

describe.only('This test suite is exclusive for create reserve through API', () => {
  test('should be able create reserve', async () => {
    const data = {
      name: 'john.doe@email.com',
      email: 'john.doe@email.com',
      paymentMethodId: 1,
      // checkIn: '2024-07-09T12:00:00.000Z',
      // checkOut: '2024-07-10T12:00:00.000Z',
      ...GenRandomCheckInAndOut(),
      qtyOfGuests: 3,
      roomsId: ['ee851e24-6301-485a-b354-744078906b44']
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const responseCreateReserve = await fetch(`${env.SELF_HOST}/create-reserve`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    const responseBodyCreateReserve = await responseCreateReserve.json()

    const responseGetReserve = await fetch(`${env.SELF_HOST}/reserve/${responseBodyCreateReserve.reserveId}`, {
      headers
    })
    const { reserve } = await responseGetReserve.json()

    expect(responseCreateReserve.status).toStrictEqual(201)
    expect(responseBodyCreateReserve.reserveId).toBeDefined()
    expect(responseBodyCreateReserve.reserveId).toStrictEqual(reserve.reserveId)
    expect(reserve.name).toStrictEqual(data.name)
    expect(reserve.email).toStrictEqual(data.email)
    expect(reserve.checkIn).toStrictEqual(data.checkIn)
    expect(reserve.checkOut).toStrictEqual(data.checkOut)
    expect(reserve.qtyOfGuests).toStrictEqual(data.qtyOfGuests)
    expect(reserve.paymentMethodId).toStrictEqual(data.paymentMethodId)
    expect(reserve.roomsId).toStrictEqual(data.roomsId)
  }, { timeout: 10000 })

  test('should not be able create reserve if already another reserve in there room there period', async () => {


    const data = {
      name: 'john.doe@email.com',
      email: 'john.doe@email.com',
      paymentMethodId: 1,
      ...GenRandomCheckInAndOut(),
      qtyOfGuests: 3,
      roomsId: ['ee851e24-6301-485a-b354-744078906b44']
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    await fetch(`${env.SELF_HOST}/create-reserve`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    const response = await fetch(`${env.SELF_HOST}/create-reserve`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    const responseBody = await response.json()

    expect(response.status).toStrictEqual(422)
    expect(responseBody.message).toStrictEqual(
      'Não foi possível fazer reserva pois esse quarto/esses quartos já estão reservados para este mesmo período'
    )
  }, { timeout: 10000 })
})