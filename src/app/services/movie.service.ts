import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { MovieDto } from '../types/movie-dto.type';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  endpoint: string = "https://localhost:7141/api/Movies";

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getMovieById(id: string) {
    return this.httpClient.get<MovieDto>(`${this.endpoint}/${id}`)
      .pipe(
        tap((value) => {
          console.log(value);      
        }),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
