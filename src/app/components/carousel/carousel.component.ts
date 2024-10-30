import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieDto } from '../../types/movie-dto.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() movies: MovieDto[] = [];
  @Input() autoSlide: boolean = true;
  @Input() autoSlideTimer: number = 10000;

  constructor(private router: Router) {
    if (this.autoSlide) {
      this.autoSlideCarousel();
    }
  }

  selectedIndex = 0;

  autoSlideCarousel() {
    setInterval(() => this.onClickNextButton(), this.autoSlideTimer);
  }

  onClickNextButton() {
    if (this.selectedIndex === this.movies.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }

  onClickPrevButton() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.movies.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }

  navigateToMoviePage() {
    this.router.navigate([`filme/${this.movies[this.selectedIndex].id}`]);
  }
}
