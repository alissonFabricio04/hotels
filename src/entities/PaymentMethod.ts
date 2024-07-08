export default class PaymentMethod {
  constructor(
    protected id: number,
    protected name: string,
    protected deletedAt: Date | null = null
  ) { }

  delete() {
    if (!this.deletedAt) this.deletedAt = new Date()
  }

  rollbackDelete() {
    if (this.deletedAt) this.deletedAt = null
  }
}
