import UnprocessableEntity from "../../errors/UnprocessableEntity"

export default class Double {
  private value: number

  constructor(value: number) {
    if (!this.isAIntValid(value)) {
      throw new UnprocessableEntity('O valor fornecido não é um número real')
    }

    this.value = value
  }

  isAIntValid(n: number) {
    return Number.isFinite(n) && !Number.isNaN(n) && n > 0
  }

  getValue() {
    return this.value
  }
}