import Room from "./Room"

type Hotel = {
  hotelId: string
  name: string
  lat: number
  long: number
  zip: string
  address: string
  number: number
  complement: string | null
  city: string
  state: string
  country: string
  rooms: Room[]
}

export default Hotel