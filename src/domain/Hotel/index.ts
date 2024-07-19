import { UUId } from "../Id"
import Location from "../Location"

export default class Hotel {
  private constructor(
    private hotelId: UUId,
    private name: string,
    private location: Location,
    private zip: string,
    private address: string,
    private number: number,
    private complement: string | null,
    private city: string,
    private state: string,
    private country: string
  ) { }

  static create(
    name: string,
    location: Location,
    zip: string,
    address: string,
    number: number,
    complement: string | null,
    city: string,
    state: string,
    country: string
  ) {
    return new Hotel(
      UUId.create(),
      name,
      location,
      zip,
      address,
      number,
      complement,
      city,
      state,
      country
    )
  }

  static restore(
    hotelId: string,
    name: string,
    location: Location,
    zip: string,
    address: string,
    number: number,
    complement: string | null,
    city: string,
    state: string,
    country: string
  ) {
    return new Hotel(
      UUId.restore(hotelId),
      name,
      location,
      zip,
      address,
      number,
      complement,
      city,
      state,
      country
    )
  }

  getId() {
    return this.hotelId
  }

  getName() {
    return this.name
  }

  getLocation() {
    return this.location
  }

  getZip() {
    return this.zip
  }

  getAddress() {
    return this.address
  }

  getNumber() {
    return this.number
  }

  getComplement() {
    return this.complement
  }

  getCity() {
    return this.city
  }

  getState() {
    return this.state
  }

  getCountry() {
    return this.country
  }
}
