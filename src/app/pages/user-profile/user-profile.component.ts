import { Component, signal } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../types/response/user-dto.type';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtualizarUserRequest } from '../../types/request/atualizar-user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    PrimaryInputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router)
    {
      this.userForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber: new FormControl('')
      });
    }

  user!: UserDto;

  requestLoading = signal(false);

  ngOnInit() {
    this.buscarInfoUser();
  }

  buscarInfoUser() {
    this.requestLoading.set(true);
    const userId = sessionStorage.getItem("user-id") || "";

    this.userService.buscarPeloId(userId).subscribe({
      next: (value) => {
        this.requestLoading.set(false);
        this.user = value;

        this.userForm.setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNumber: value.phoneNumber
        });
      },
      error: (error) => {
        this.requestLoading.set(false);
        this.toastr.error(error.message, "FALHA");
        
        if (error.message?.includes('token'))
          this.router.navigate(["login"]);
      }
    });
  }

  salvarInfoUser() {
    if (this.user.firstName === this.userForm.value.firstName &&
      this.user.lastName === this.userForm.value.lastName &&
      this.user.phoneNumber === this.userForm.value.phoneNumber) {

        this.toastr.warning("Você não alterou nenhuma informação.", "FALHA");
        return;
    }

    if (this.userForm.invalid) {
      this.toastr.error("Preencha todas as informações corretamente.", "FALHA");
      return;
    }

    this.requestLoading.set(true);

    const userId = sessionStorage.getItem("user-id") || "";
    const dadosUser: AtualizarUserRequest = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber
    }
    
    this.userService.atualizarCadastro(userId, dadosUser).subscribe({
      next: (value) => {
        this.toastr.success("Dados atualizados!", "SUCESSO");
        
        this.user.firstName = this.userForm.value.firstName;
        this.user.lastName = this.userForm.value.lastName;
        this.user.phoneNumber = this.userForm.value.phoneNumber;

        this.requestLoading.set(false);
      },
      error: (error) => {
        this.requestLoading.set(false);
        this.toastr.error(error.message, "FALHA");
      }
    });
  }
}
