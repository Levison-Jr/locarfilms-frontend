import { Component, signal } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../services/identity.service';


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
  providers: [
    IdentityService
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private identityService: IdentityService
  ) {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    }, { validators: confirmPasswordValidator });
  }

  requestLoading = signal(false);

  cadastrar() {
    if (this.cadastroForm.errors?.['PasswordNoMatch']) {
      this.toastr.error("A confirmação da senha não é válida.", "FALHA");
      return;
    }

    if (!this.cadastroForm.valid) {
      this.toastr.error("A senha precisa ter letra maiúscula, minúscula e número, entre 5 e 20 caracteres.", "FALHA");
      return;
    }

    this.requestLoading.set(true);
    
    this.identityService.cadastro(
      this.cadastroForm.value.email,
      this.cadastroForm.value.password,
      this.cadastroForm.value.passwordConfirmation
    )
      .subscribe({
        next: () => {
          this.efetuarLoginAposCadastro();
        },
        error: (error) => {
          this.toastr.error(error.message, "FALHA");
          this.requestLoading.set(false);
        }
      });
  }

  navigateToLoginPage() {
    this.router.navigate(["login"]);
  }

  navigateToMainPage() {
    this.router.navigate([""]);
  }

  efetuarLoginAposCadastro() {

    this.identityService.login(this.cadastroForm.value.email, this.cadastroForm.value.password)
      .subscribe({
        next: () => {
          this.toastr.success("Cadastro efetuado com sucesso!", "BEM-VINDO(A)");
          this.requestLoading.set(false);

          this.navigateToMainPage();
        },
        error: () => {
          this.toastr.error("Não foi possível realizar o login.", "FALHA");
          this.requestLoading.set(false);
        }       
      });
  }
}
