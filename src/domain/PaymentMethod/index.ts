import NotImplemented from "../../errors/NotImplemented"
import { NumericId } from "../Id"
import Int from "../Int"

export default interface PaymentMethod {
  getId: () => NumericId
  getName: () => string
  getDeletedAt: () => null | Date
}

export class CreditCard implements PaymentMethod {
  private constructor(
    private id: NumericId,
    private name: string,
    private deletedAt: null | Date
  ) { }

  static instance() {
    return new CreditCard(new NumericId(1), 'Credit card', null)
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getDeletedAt() {
    return this.deletedAt
  }
}

export class PaymentMethodFactory {
  static create(paymentMethodId: number) {
    switch (paymentMethodId) {
      case 1:
        return CreditCard

      default:
        throw new NotImplemented('Método de pagamento não disponível')
    }
  }
}