export default class UnprocessableEntity extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnprocessableEntity'
  }
}