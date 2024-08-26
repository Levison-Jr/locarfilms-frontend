import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/response/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("https://localhost:7141/api/Users/login", { email, password })
      .pipe(tap(
        (value) => {
          console.log(value);
          sessionStorage.setItem("auth-token", value.accessToken)
        })
      );
  }
}
