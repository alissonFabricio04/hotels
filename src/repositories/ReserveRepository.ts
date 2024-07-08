import Reserve from "../entities/Reserve";

export default interface ReserveRepository {
  save: (reserve: Reserve) => Promise<void>
  getById: (reserveId: string) => Promise<Reserve | null>
}