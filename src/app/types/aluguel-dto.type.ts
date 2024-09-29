import { AluguelStatusEnum } from "../enums/aluguel-status-enum"
import { PagamentoStatusEnum } from "../enums/pagamento-status-enum"
import { MovieDto } from "./movie-dto.type"

export type AluguelDto = {
    id: number,
    userId: string,
    movieId: number,
    rentalStartDate: string,
    rentalEndDate: string,
    rentalStatus: AluguelStatusEnum,
    paymentStatus: PagamentoStatusEnum,
    movie: MovieDto
}