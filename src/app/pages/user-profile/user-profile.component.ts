import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../types/response/user-dto.type';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    PrimaryInputComponent,
    ButtonComponent
  ],
  providers: [
    UserService
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(
    private userService: UserService,
    private toastr: ToastrService) { }

  user!: UserDto;

  ngOnInit() {
    const userId = sessionStorage.getItem("user-id") || "";
    this.userService.buscarPeloId(userId).subscribe({
      next: (value) => {
        this.user = value;
      },
      error: (error) => {
        this.toastr.error(error.message, "FALHA");
      }
    });
  }

  salvarInfoUser() {
    console.log('salvarInfoUser');
  }
}
