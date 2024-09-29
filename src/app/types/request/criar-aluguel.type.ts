import { AluguelStatusEnum } from "../../enums/aluguel-status-enum"
import { PagamentoStatusEnum } from "../../enums/pagamento-status-enum"

export type CriarAluguelRequest = {
    userId: string,
    movieId: number,
    rentalStartDate: string,
    rentalEndDate: string,
    rentalStatus: AluguelStatusEnum,
    paymentStatus: PagamentoStatusEnum
}