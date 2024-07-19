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
    const phi1 = this.getLat()
    const phi2 = pointA.getLat()
    const deltaPhi = phi2 - phi1
    const sinOfDeltaPhi = Math.sin(deltaPhi / 2) ** 2

    const lambda1 = this.getLong()
    const lambda2 = pointA.getLong()
    const deltaLambda = lambda2 - lambda1
    const sinOfDeltaLambda = Math.sin(deltaLambda / 2) ** 2

    const a = sinOfDeltaPhi + Math.cos(phi1) * Math.cos(phi2) * sinOfDeltaLambda
    const c = 2 * Math.atan2(a ** (1 / 2), (1 - a) ** (1 / 2))
    return this.EARTH_RADIUS_IN_KM * c
  }

  getLat() {
    return this.latitude
  }

  getLong() {
    return this.longitude
  }
}