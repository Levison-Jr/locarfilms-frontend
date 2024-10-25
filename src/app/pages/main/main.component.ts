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
      id: 1,
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
      imageBannerUrl: "https://super.abril.com.br/wp-content/uploads/2018/07/site_71.jpg?crop=1&resize=500,300",
      imageIconUrl: "https://super.abril.com.br/wp-content/uploads/2018/07/site_71.jpg?crop=1&resize=100,75"
    },
    {
      id: 2,
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
      imageBannerUrl: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/03/07195642/Divertida-Mente-2.jpg",
      imageIconUrl: "https://www.atoupeira.com.br/wp-content/uploads/2023/11/divertida-mente-2-poster-nacional.jpg"
    },
    {
      id: 2,
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
      imageBannerUrl: "https://cinepop.com.br/wp-content/uploads/2020/02/um-lugar-silencioso-parte-2.jpg",
      imageIconUrl: "https://cinepop.com.br/wp-content/uploads/2020/02/um-lugar-silencioso-parte-2.jpg"
    }
  ];

  moviesToExplorer: MovieDto[] = [
    {
      id: 1,
      title: "Projeto Almanaque",
      subTitle: "",
      description: "",
      duration: "",
      category: "Ficção Científica",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://m.media-amazon.com/images/S/pv-target-images/fafc2efd6148875936b80cd2289054ce7b5c9ab04c0a7aa7d231e67d7c87fadc.jpg",
      imageIconUrl: "https://m.media-amazon.com/images/S/pv-target-images/fafc2efd6148875936b80cd2289054ce7b5c9ab04c0a7aa7d231e67d7c87fadc.jpg"
    },
    {
      id: 2,
      title: "O Auto da Compadecida",
      subTitle: "",
      description: "",
      duration: "",
      category: "Comédia",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://br.web.img3.acsta.net/r_1280_720/pictures/210/416/21041683_20130919124706739.jpg",
      imageIconUrl: "https://br.web.img3.acsta.net/r_1280_720/pictures/210/416/21041683_20130919124706739.jpg"
    },
    {
      id: 2,
      title: "Sempre ao Seu Lado",
      subTitle: "",
      description: "",
      duration: "",
      category: "Drama",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/87/30/97/20028681.jpg",
      imageIconUrl: "https://br.web.img3.acsta.net/medias/nmedia/18/87/30/97/20028681.jpg"
    },
    {
      id: 2,
      title: "Divertidamente 2",
      subTitle: "",
      description: "",
      duration: "",
      category: "Animação",
      status: MovieStatusEnum.isAvailable,
      costPerDay: 2,
      releaseDate: "",
      registrationDateTime: "",
      lastModifiedDateTime: "",
      imageBannerUrl: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/03/07195642/Divertida-Mente-2.jpg",
      imageIconUrl: "https://www.atoupeira.com.br/wp-content/uploads/2023/11/divertida-mente-2-poster-nacional.jpg"
    }
  ];
}
