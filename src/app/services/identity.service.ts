import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/response/login-response.type';
import { catchError, tap } from 'rxjs';
import { UserDto } from '../types/response/user-dto.type';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  endpointLogin: string = `${environment.API_URL}/Users/login`;
  endpointCadastro: string = `${environment.API_URL}/Users/register`;

  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.endpointLogin, { email, password })
      .pipe(tap(
        (value) => {
          sessionStorage.setItem("user-id", value.userId);
          sessionStorage.setItem("auth-token", value.accessToken);
        })
      );
  }

  logout() {
    sessionStorage.removeItem("auth-token");
  }

  cadastro(email: string, password: string, passwordConfirm: string) {
    return this.httpClient.post<UserDto>(this.endpointCadastro, { email, password, passwordConfirm })
      .pipe(
        tap(
          (value) => {
            console.log(value);
            sessionStorage.setItem("last-registered-user-email", value.email)
          }
        ),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
