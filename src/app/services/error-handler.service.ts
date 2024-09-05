import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export interface ValidationError {
  type?: string;
  title: string;
  status: number;
  errors?: { [key: string]: string[] };
  traceId?: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;

    } else {
      const backendError = error.error as ValidationError;
      if (error.status === 400) {
        if (backendError.errors) {
          const validationErrors = backendError.errors;
          for (let field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
              errorMessage = validationErrors[field][0];
            }
          }
        } else if (backendError.detail) {
          errorMessage = backendError.detail;
        }
      }
    }
  
    return throwError(() => new Error(errorMessage));
  }
}
