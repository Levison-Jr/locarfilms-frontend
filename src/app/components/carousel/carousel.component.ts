import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface carouselImage {
  imageSrc: string
}

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
  @Input() images: carouselImage[] = [];
  @Input() autoSlide: boolean = true;
  @Input() autoSlideTimer: number = 10000;

  constructor() {
    if (this.autoSlide) {
      this.autoSlideCarousel();
    }
  }

  selectedIndex = 0;

  autoSlideCarousel() {
    setInterval(() => this.onClickNextButton(), this.autoSlideTimer);
  }

  onClickNextButton() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }

  onClickPrevButton() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }
}
