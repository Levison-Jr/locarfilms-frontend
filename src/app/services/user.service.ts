import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { UserDto } from '../types/response/user-dto.type';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = "https://localhost:7141/api/Users";

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  buscarPeloId(id: string) {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<UserDto>(`${this.endpoint}/${id}`, { headers })
      .pipe(
        tap((value) => {
          console.log(value);
        }),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
