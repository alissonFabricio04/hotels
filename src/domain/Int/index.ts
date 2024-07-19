import UnprocessableEntity from "../../errors/UnprocessableEntity"

export default class Int {
  private value: number

  constructor(value: number) {
    if (!this.isAIntValid(value)) {
      throw new UnprocessableEntity('O valor fornecido não é um inteiro válido')
    }

    this.value = Math.round(value)
  }

  isAIntValid(n: number) {
    return Number.isFinite(n) && !Number.isNaN(n) && Number.isSafeInteger(n) && n > 0
  }

  getValue() {
    return this.value
  }
}