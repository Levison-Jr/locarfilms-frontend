import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieDto } from '../../types/movie-dto.type';
import { MovieStatusEnum } from '../../enums/movie-status-enum';
import { MovieService } from '../../services/movie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage,
    CarouselComponent,
    MovieCardComponent
  ],
  providers: [
    MovieService
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor (
    private movieService: MovieService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.movieService.buscarTodos("", MovieStatusEnum.isAvailable).subscribe({
      next: (value) => {
        console.log(value);
        this.moviesToExplorer = value;
      },
      error: (error) => {
        this.toastr.error(error.message, "FALHA");
      }
    });
  }

  moviesToCarousel: MovieDto[] = [
    {
      id: 21,
      title: "Vingadores",
      subTitle: "Guerra Infinita",
      description: "",
      duration: "",
      category: "",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://image.tmdb.org/t/p/w780/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg",
      imageIconUrl: "https://image.tmdb.org/t/p/w185/tstLvhcR281FF3b8iZs7vN2voE9.jpg",
      youTubeTraillerUrl: ""
    },
    {
      id: 22,
      title: "Divertidamente 2",
      subTitle: "",
      description: "",
      duration: "",
      category: "",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://image.tmdb.org/t/p/w780/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
      imageIconUrl: "https://image.tmdb.org/t/p/w185/5w90NKW3pzurPMzNdzZmlto5Bt5.jpg",
      youTubeTraillerUrl: ""
    },
    {
      id: 23,
      title: "Um Lugar Silencioso 2",
      subTitle: "",
      description: "",
      duration: "",
      category: "",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://image.tmdb.org/t/p/w780/i5IPrDQ8VevRKJPpLdmyvSLqtbr.jpg",
      imageIconUrl: "https://image.tmdb.org/t/p/w185/sudgADOF0REnpM1GnU6DgSHV0QZ.jpg",
      youTubeTraillerUrl: ""
    }
  ];

  moviesToExplorer: MovieDto[] = [];
}
