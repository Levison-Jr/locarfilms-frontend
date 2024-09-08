import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-info-movie',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage
  ],
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss'
})
export class InfoMovieComponent {
  movieId: string | null = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");
  }
}
