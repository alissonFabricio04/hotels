import NotImplemented from "../../errors/NotImplemented"
import { NumericId } from "../Id"

export default interface RoomStatus {
  getId: () => NumericId
  getName: () => string
}

export class BusyStatus implements RoomStatus {
  private constructor(private id: NumericId, private name: string) { }

  static instance() {
    return new BusyStatus(new NumericId(1), 'Busy')
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }
}

export class FreeStatus implements RoomStatus {
  private constructor(private id: NumericId, private name: string) { }

  static instance() {
    return new FreeStatus(new NumericId(2), 'Free')
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }
}

export class RoomStatusFactory {
  static createByName(statusName: string) {
    switch (String(statusName).toUpperCase()) {
      case 'BUSY':
        return BusyStatus

      case 'FREE':
        return FreeStatus

      default:
        throw new NotImplemented('Status não implementado')
    }
  }

  static createById(statusId: number) {
    switch (statusId) {
      case 1:
        return BusyStatus

      case 2:
        return FreeStatus

      default:
        throw new NotImplemented('Status não implementado')
    }
  }
}