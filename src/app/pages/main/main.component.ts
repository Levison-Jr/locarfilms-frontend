import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage,
    CarouselComponent,
    MovieCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  images = [
    {
      imageSrc: "https://dspa.com.br/wp-content/uploads/2018/04/1d69b1e3d517074c4643f77f95a64f49.jpg"
    },
    {
      imageSrc: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/03/07195642/Divertida-Mente-2.jpg"
    },
    {
      imageSrc: "https://cinepop.com.br/wp-content/uploads/2020/02/um-lugar-silencioso-parte-2.jpg"
    }
  ];
}
