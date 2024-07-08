import { randomUUID } from "crypto";
import UnprocessableEntity from "../errors/UnprocessableEntity";
import Email from "./Email";

export default class Reserve {
  private constructor(
    private reserveId: string,
    private name: string,
    private email: Email,
    private checkIn: Date,
    private checkOut: Date,
    private qtyOfGuests: number,
    private paymentMethodId: number,
    private roomsId: string[]
  ) { }

  static create(
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    qtyOfGuests: number,
    paymentMethodId: number,
    roomsId: string[]
  ) {
    if (!Reserve.checkOutIsAfterCheckIn(checkIn, checkOut)) {
      throw new UnprocessableEntity('O check out deve ser uma data posterior ao check in')
    }

    if (Reserve.nameIsEmpty(name)) {
      throw new UnprocessableEntity('Nome não foi fornecido')
    }

    if (!Reserve.hasAnyRoomSelected(roomsId)) {
      throw new UnprocessableEntity('Nenhum quarto foi selecionado')
    }

    const reserveId = randomUUID()
    return new Reserve(
      reserveId,
      name,
      new Email(email),
      checkIn,
      checkOut,
      qtyOfGuests,
      paymentMethodId,
      roomsId
    )
  }

  static checkOutIsAfterCheckIn(checkIn: Date, checkOut: Date) {
    return checkOut.getTime() > checkIn.getTime()
  }

  static nameIsEmpty(name: string) {
    return !name || name.length <= 0
  }

  static hasAnyRoomSelected(roomsId: string[]) {
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
    roomsId: string[]
  ) {
    return new Reserve(
      reserveId,
      name,
      new Email(email),
      checkIn,
      checkOut,
      qtyOfGuests,
      paymentMethodId,
      roomsId
    )
  }

  getReserveId() {
    return this.reserveId
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email.getValue()
  }

  getCheckIn() {
    return this.checkIn
  }

  getCheckOut() {
    return this.checkOut
  }

  getQtyOfGuests() {
    return this.qtyOfGuests
  }

  getPaymentMethodId() {
    return this.paymentMethodId
  }

  getRoomsId() {
    return this.roomsId
  }
} 