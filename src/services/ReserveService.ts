import Reserve from "../entities/Reserve";
import NotFound from "../errors/NotFound";
import UnprocessableEntity from "../errors/UnprocessableEntity";
import PaymentMethodRepository from "../repositories/PaymentMethodRepository";
import ReserveRepository from "../repositories/ReserveRepository";
import RoomRepository from "../repositories/RoomRepository";
import { CreateReserveInputDTO, CreateReserveOutputDTO, GetReserveOutputDTO } from "./ReserveDTO";

export default class ReserveService {
  constructor(
    private paymentMethodRepository: PaymentMethodRepository,
    private roomRepository: RoomRepository,
    private reserveRepository: ReserveRepository
  ) { }

  async createReserve(input: CreateReserveInputDTO): Promise<CreateReserveOutputDTO> {
    const paymentMethodExists = await this.paymentMethodRepository.getById(input.paymentMethodId)
    if (!paymentMethodExists) {
      throw new UnprocessableEntity('Método de pagamento não disponível')
    }

    const roomsId = await this.roomRepository.getById(input.roomsId)
    if (roomsId.length !== input.roomsId.length) {
      throw new UnprocessableEntity('Quarto não encontrado')
    }

    const checkIn = new Date(input.checkIn)
    const checkOut = new Date(input.checkOut)

    const theseRoomAvailableIn = await this.roomRepository.theseRoomAvailableIn(
      input.roomsId,
      checkIn,
      checkOut
    )

    if (!theseRoomAvailableIn) {
      throw new UnprocessableEntity(
        'Não foi possível fazer reserva pois esse quarto/esses quartos já estão reservados para este mesmo período'
      )
    }

    const reserve = Reserve.create(
      input.name,
      input.email,
      checkIn,
      checkOut,
      input.qtyOfGuests,
      input.paymentMethodId,
      input.roomsId
    )

    await this.reserveRepository.save(reserve)

    return {
      reserveId: reserve.getReserveId()
    }
  }

  async getReserve(reserveId: string): Promise<GetReserveOutputDTO> {
    const reserve = await this.reserveRepository.getById(reserveId)
    if (!reserve) {
      throw new NotFound('Reserva não encontrada')
    }

    return {
      reserveId: reserve.getReserveId(),
      name: reserve.getName(),
      email: reserve.getEmail(),
      checkIn: reserve.getCheckIn().toISOString(),
      checkOut: reserve.getCheckOut().toISOString(),
      qtyOfGuests: reserve.getQtyOfGuests(),
      paymentMethodId: reserve.getPaymentMethodId(),
      roomsId: reserve.getRoomsId()
    }
  }
}