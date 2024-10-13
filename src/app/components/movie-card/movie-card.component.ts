import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  host: {
    '(click)':'navigateToMoviePage()'
  },
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movieId: number = 0;
  @Input() titulo: string = "";
  @Input() categoria: string = "";
  @Input() caminhoImagem: string = "";

  constructor(private router: Router) { }

  navigateToMoviePage() {
    this.router.navigate([`filme/${this.movieId}`]);
  }
}
