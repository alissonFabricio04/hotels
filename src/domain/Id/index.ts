import { randomUUID } from "crypto"
import UnprocessableEntity from '../../errors/UnprocessableEntity'
import Int from "../Int"

export abstract class Id<T> {
  protected value: T

  protected constructor(value: T) {
    if (!this.isAUUIdValid(value)) {
      throw new UnprocessableEntity('O id fornecido não é válido')
    }

    this.value = value
  }

  abstract isAUUIdValid(id: T): boolean

  getValue(): T {
    return this.value
  }
}

export class UUId extends Id<string> {
  constructor(value: string) {
    super(value)
  }

  isAUUIdValid(id: string) {
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return !!id && id.length === 36 && regex.test(id)
  }

  static create() {
    return new UUId(randomUUID())
  }

  static restore(id: string) {
    return new UUId(id)
  }
}

export class NumericId extends Id<Int> {
  constructor(value: number) {
    super(new Int(value))
  }

  isAUUIdValid(_: Int) {
    return true
  }
}
