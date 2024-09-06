import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() titulo: string = "";
  @Input() categoria: string = "";
  @Input() caminhoImagem: string = "";
}
