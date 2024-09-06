import { Component, signal } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    IdentityService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });
  }

  requestLoading = signal(false);

  login() {
    this.requestLoading.set(true);

    this.identityService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.toastr.success("Login efetuado com sucesso!", "BEM-VINDO(A)");
          this.requestLoading.set(false);

          this.navigateToMainPage();
        },
        error: () => {
          this.toastr.error("Email ou senha incorretos.", "FALHA");
          this.requestLoading.set(false);
        }       
      });
  }

  navigateToSignupPage() {
    this.router.navigate(["cadastro"]);
  }

  navigateToMainPage() {
    this.router.navigate([""]);
  }
}
