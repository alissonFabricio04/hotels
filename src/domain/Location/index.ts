import UnprocessableEntity from "../../errors/UnprocessableEntity"

export default class Location {
  private latitude: number
  private longitude: number
  EARTH_RADIUS_IN_KM = 6371

  private constructor(latitude: number, longitude: number) {
    this.validateLat(latitude)
    this.validateLong(longitude)
    this.latitude = latitude
    this.longitude = longitude
  }

  private validateLat(latitude: number) {
    if (!latitude) {
      throw new UnprocessableEntity('Latitude invalida')
    }

    if (latitude < -90 || latitude > 90) {
      throw new UnprocessableEntity('Latitude invalida')
    }
  }

  private validateLong(longitude: number) {
    if (!longitude) {
      throw new UnprocessableEntity('Longitude invalida')
    }

    if (longitude < -180 || longitude > 180) {
      throw new UnprocessableEntity('Longitude invalida')
    }
  }

  static instance(latitude: number, longitude: number) {
    return new Location(latitude, longitude)
  }

  calculateDistance(pointA: Location) {
    const lat1 = this.getLat()
    const lon1 = this.getLong()
    const lat2 = pointA.getLat()
    const lon2 = pointA.getLong()

    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return this.EARTH_RADIUS_IN_KM * c
  }

  toRadians(degrees: number) {
    return degrees * (Math.PI / 180)
  }

  getLat() {
    return this.latitude
  }

  getLong() {
    return this.longitude
  }
}