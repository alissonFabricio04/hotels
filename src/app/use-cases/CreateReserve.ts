import { UUId } from "../../domain/Id";
import { PaymentMethodFactory } from "../../domain/PaymentMethod";
import Period from "../../domain/Period";
import Reserve from "../../domain/Reserve";
import UnprocessableEntity from "../../errors/UnprocessableEntity";
import NotificationQueue from "../queue/NotificationQueue";
import ReserveRepository from "../repositories/ReserveRepository";
import RoomRepository from "../repositories/RoomRepository";

export type Input = {
  name: string
  email: string
  checkIn: string
  checkOut: string
  qtyOfGuests: number
  paymentMethodId: number
  roomsId: string[]
}

export default class CreateReserve {
  constructor(
    private roomRepository: RoomRepository,
    private reserveRepository: ReserveRepository,
    private notificationQueue: NotificationQueue
  ) { }

  async handle(input: Input): Promise<void> {
    const paymentMethod = PaymentMethodFactory
      .create(input.paymentMethodId)
      .instance()

    const paymentMethodId = paymentMethod
      .getId()
      .getValue()
      .getValue()

    const roomsId = input.roomsId.map(r => UUId.restore(r))
    const period = Period.instanceStr(input.checkIn, input.checkOut)

    const areAvailable = await this.roomRepository.areAvailable(roomsId, period)
    if (areAvailable.length !== roomsId.length) {
      throw new UnprocessableEntity(
        'Não foi possível fazer reserva pois esse quarto/esses quartos já estão reservados para este mesmo período'
      )
    }

    const reserve = Reserve.create(
      input.name,
      input.email,
      period.getCheckIn(),
      period.getCheckOut(),
      input.qtyOfGuests,
      paymentMethodId,
      areAvailable.map(r => ({
        id: r.getId().getValue(),
        price: r.getDailyPrice().getValue()
      }))
    )

    await this.reserveRepository.save(reserve)

    const subject = 'Reserva feita com sucesso'
    const body = `
      Parabéns!!! <br>

      Reserva feita com sucesso <br>
      <br>

      Resumo da reserva:
      <ul>
        <li>
          Check in: <strong>${reserve.getCheckIn().toISOString()}</strong>
        </li>

        <li>
          Check out: <strong>${reserve.getCheckOut().toISOString()}</strong>
        </li>

        <li>
          Quantidade de pessoas: <strong>${reserve.getQtyOfGuests().getValue()}</strong>
        </li>
      </ul>
    `
    await this.notificationQueue.send(reserve.getEmail(), subject, body)
  }
}
