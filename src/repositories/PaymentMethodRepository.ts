import PaymentMethod from "../entities/PaymentMethod";

export default interface PaymentMethodRepository {
  getById: (paymentMethodId: number) => Promise<PaymentMethod | null>
}