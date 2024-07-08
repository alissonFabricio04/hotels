export type CreateReserveInputDTO = {
  name: string
  email: string
  checkIn: string
  checkOut: string
  qtyOfGuests: number
  paymentMethodId: number
  roomsId: string[]
}

export type CreateReserveOutputDTO = {
  reserveId: string
}

export type GetReserveOutputDTO = {
  reserveId: string
  name: string
  email: string
  checkIn: string
  checkOut: string
  qtyOfGuests: number
  paymentMethodId: number
  roomsId: string[]
}
