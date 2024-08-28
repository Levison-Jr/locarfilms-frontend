import { Component, signal } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmation = control.get('passwordConfirmation');
  
  return password?.value === confirmation?.value ? null : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    }, { validators: confirmPasswordValidator });
  }

  requestLoading = signal(false);

  cadastrar() {
    
  }

  navigateToLoginPage() {
    this.router.navigate(["login"]);
  }
}
