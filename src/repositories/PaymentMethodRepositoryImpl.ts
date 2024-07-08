import { IDatabaseConnection } from "../database/DatabaseConnection";
import PaymentMethod from "../entities/PaymentMethod";
import PaymentMethodRepository from "./PaymentMethodRepository";

export default class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  constructor(private databaseConnection: IDatabaseConnection) { }

  async getById(paymentMethodId: number): Promise<PaymentMethod | null> {
    const paymentMethod = await this.databaseConnection.paymentMethods.findUnique({
      where: {
        id: paymentMethodId
      }
    })

    if (!paymentMethod) return null

    return new PaymentMethod(
      paymentMethod.id,
      paymentMethod.name,
      paymentMethod.deletedAt
    )
  }
}