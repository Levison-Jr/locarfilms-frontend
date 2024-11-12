import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../types/response/user-dto.type';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtualizarUserRequest } from '../../types/request/atualizar-user.type';

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
    private toastr: ToastrService)
    {
      this.userForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber: new FormControl('')
      });
    }

  user!: UserDto;

  ngOnInit() {
    const userId = sessionStorage.getItem("user-id") || "";
    this.userService.buscarPeloId(userId).subscribe({
      next: (value) => {
        this.user = value;

        this.userForm.setValue({
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNumber: value.phoneNumber
        });
      },
      error: (error) => {
        this.toastr.error(error.message, "FALHA");
      }
    });
  }

  salvarInfoUser() {
    console.log('salvarInfoUser');

    if (this.userForm.invalid) {
      this.toastr.error("Preencha todas as informações corretamente.", "FALHA");
      return;
    }

    const userId = sessionStorage.getItem("user-id") || "";
    const dadosUser: AtualizarUserRequest = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber
    }
    
    console.log(dadosUser);
    

    this.userService.atualizarCadastro(userId, dadosUser).subscribe({
      next: (value) => {
        this.toastr.success("Dados atualizados!", "SUCESSO");
      },
      error: (error) => { this.toastr.error(error.message, "FALHA"); }
    });
  }
}
