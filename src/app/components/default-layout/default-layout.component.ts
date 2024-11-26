import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
  providers: [
    IdentityService
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  @Input() headerVisible: boolean = true;
  usuarioAutenticado: boolean = false;

  constructor(
    private identityService: IdentityService,
    private router: Router
  ) {
    this.usuarioAutenticado = sessionStorage.getItem("auth-token") !== null;
  }

  menuIsOpen = false;
  openCloseHandlerMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  navigateToLoginPage() {
    this.identityService.logout();
    this.router.navigate(["login"]);
  }

  navigateToMainPage() {
    this.router.navigate([""]);
  }

  navigateToUserMoviePage() {
    this.router.navigate(["user-movies"]);
  }

  navigateToUserProfilePage() {
    this.router.navigate(["user-profile"]);
  }

  navigateToImagesRights() {
    
  }
}
