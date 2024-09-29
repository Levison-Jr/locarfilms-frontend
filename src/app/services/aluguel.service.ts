import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { CriarAluguelRequest } from '../types/request/criar-aluguel.type';
import { AluguelDto } from '../types/aluguel-dto.type';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
  endpoint: string = "https://localhost:7141/api/Rental";

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  criarAluguel(criarAluguelRequest: CriarAluguelRequest) {
    return this.httpClient.post<AluguelDto>(this.endpoint, criarAluguelRequest)
      .pipe(
        tap((value) => {
          console.log(value);
        }),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
