import UnprocessableEntity from "../../errors/UnprocessableEntity"

export default class Period {
  private constructor(
    private checkIn: Date,
    private checkOut: Date
  ) { }

  static instance(checkIn: Date, checkOut: Date) {
    if (!Period.checkOutIsAfterCheckIn(checkIn, checkOut)) {
      throw new UnprocessableEntity('O check out deve ser uma data posterior ao check in')
    }
    return new Period(checkIn, checkOut)
  }

  static instanceStr(checkIn: string, checkOut: string) {
    const chkIn = Period.parseStrToDate(checkIn)
    const chkOut = Period.parseStrToDate(checkOut)
    if (!Period.checkOutIsAfterCheckIn(chkIn, chkOut)) {
      throw new UnprocessableEntity('O check out deve ser uma data posterior ao check in')
    }
    return new Period(chkIn, chkOut)
  }

  static parseStrToDate(date: string) {
    const timestamp = Date.parse(date)

    if (isNaN(timestamp) == false) {
      throw new UnprocessableEntity('Data com formato inválido')
    }

    return new Date(timestamp)
  }

  static checkOutIsAfterCheckIn(checkIn: Date, checkOut: Date) {
    return checkOut.getTime() > checkIn.getTime()
  }

  getCheckIn() {
    return this.checkIn
  }

  getCheckOut() {
    return this.checkOut
  }

  getQtyOfDay() {
    const diff = this.checkOut.getTime() - this.checkIn.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }
}
