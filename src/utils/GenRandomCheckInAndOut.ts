export default function GenRandomCheckInAndOut() {
  const min = 30
  const max = 1_000
  const random = Math.round(Math.random() * max + min)

  const inital = new Date().getDate() + random

  const checkIn = new Date()
  checkIn.setDate(inital)

  const checkOut = new Date()
  checkOut.setDate(inital + 20)

  return {
    checkIn,
    checkOut
  }
}