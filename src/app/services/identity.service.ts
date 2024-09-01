import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/response/login-response.type';
import { tap } from 'rxjs';
import { UserDto } from '../types/response/user-dto.type';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  endpointLogin: string = "https://localhost:7141/api/Users/login";
  endpointCadastro: string = "https://localhost:7141/api/Users/register";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.endpointLogin, { email, password })
      .pipe(tap(
        (value) => {
          console.log(value);
          sessionStorage.setItem("auth-token", value.accessToken)
        })
      );
  }

  cadastro(email: string, password: string, passwordConfirm: string) {
    return this.httpClient.post<UserDto>(this.endpointCadastro, { email, password, passwordConfirm })
      .pipe(tap(
        (value) => {
          console.log(value);
          sessionStorage.setItem("last-registered-user-email", value.email)
        })
      );
  }
}