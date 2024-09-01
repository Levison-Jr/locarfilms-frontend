import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  usuarioAutenticado: boolean = false;

  constructor(
    private router: Router
  ) {
    this.usuarioAutenticado = sessionStorage.getItem("auth-token") !== null;
  }

  navigateToLoginPage() {
    this.router.navigate(["login"]);
  }
}
