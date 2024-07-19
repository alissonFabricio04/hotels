import UnprocessableEntity from "../../errors/UnprocessableEntity"
import Email from "../Email"
import PaymentMethod, { PaymentMethodFactory } from "../PaymentMethod"
import { UUId } from "../Id"
import Period from "../Period"
import Int from "../Int"
import Double from "../Double"

export default class Reserve {
  private constructor(
    private reserveId: UUId,
    private name: string,
    private email: Email,
    private period: Period,
    private qtyOfGuests: Int,
    private paymentMethod: PaymentMethod,
    private roomsId: string[],
    private totalPrice: Double
  ) { }

  static create(
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    qtyOfGuests: number,
    paymentMethodId: number,
    rooms: { id: string, price: number }[]
  ) {
    if (Reserve.nameIsEmpty(name)) {
      throw new UnprocessableEntity('Nome não foi fornecido')
    }

    if (!Reserve.hasAnyRoomSelected(rooms)) {
      throw new UnprocessableEntity('Nenhum quarto foi selecionado')
    }

    const paymentMethod = PaymentMethodFactory
      .create(paymentMethodId)
      .instance()

    const period = Period.instance(checkIn, checkOut)
    const totalPrice = rooms.reduce((acc, { price }) => acc + (price * period.getQtyOfDay()), 0)

    return new Reserve(
      UUId.create(),
      name,
      new Email(email),
      period,
      new Int(qtyOfGuests),
      paymentMethod,
      rooms.map(r => r.id),
      new Double(totalPrice)
    )
  }

  static checkOutIsAfterCheckIn(checkIn: Date, checkOut: Date) {
    return checkOut.getTime() > checkIn.getTime()
  }

  static nameIsEmpty(name: string) {
    return !name || name.length <= 0
  }

  static hasAnyRoomSelected(roomsId: { id: string, price: number }[]) {
    return roomsId && roomsId.length > 0
  }

  static restore(
    reserveId: string,
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    qtyOfGuests: number,
    paymentMethodId: number,
    roomsId: string[],
    totalPrice: number
  ) {
    const paymentMethod = PaymentMethodFactory
      .create(paymentMethodId)
      .instance()

    return new Reserve(
      UUId.restore(reserveId),
      name,
      new Email(email),
      Period.instance(checkIn, checkOut),
      new Int(qtyOfGuests),
      paymentMethod,
      roomsId,
      new Double(totalPrice)
    )
  }

  getReserveId() {
    return this.reserveId
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  getCheckIn() {
    return this.period.getCheckIn()
  }

  getCheckOut() {
    return this.period.getCheckOut()
  }

  getQtyOfGuests() {
    return this.qtyOfGuests
  }

  getPaymentMethod() {
    return this.paymentMethod
  }

  getRoomsId() {
    return this.roomsId
  }

  getTotalPrice() {
    return this.totalPrice
  }
} 