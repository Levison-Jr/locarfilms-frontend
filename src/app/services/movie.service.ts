import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { MovieDto } from '../types/movie-dto.type';
import { catchError, tap } from 'rxjs';
import { MovieStatusEnum } from '../enums/movie-status-enum';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  endpoint: string = "https://localhost:7141/api/Movies";

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  buscarPeloId(id: string) {
    return this.httpClient.get<MovieDto>(`${this.endpoint}/${id}`)
      .pipe(
        tap((value) => {
          console.log(value);
        }),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }

  buscarTodos(categoria: string = "", movieStatusFilter: any = null) {
    let params = new HttpParams();

    if (categoria) {
      params = params.set('categoryFilter', categoria);
    }

    if (movieStatusFilter) {
      params = params.set('movieStatusFilter', movieStatusFilter);
    }

    return this.httpClient.get<MovieDto[]>(this.endpoint, { params })
      .pipe(
        tap((value) => {
          for (let i in value) {
            value[i].imageIconUrl = value[i].imageIconUrl.replace('original', 'w185');
          }
        }),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
