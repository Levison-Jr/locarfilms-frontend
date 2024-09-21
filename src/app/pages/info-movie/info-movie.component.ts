import { Component, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { MovieService } from '../../services/movie.service';
import { MovieDto } from '../../types/movie-dto.type';
import { ToastrService } from 'ngx-toastr';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

registerLocaleData(ptBr);

@Component({
  selector: 'app-info-movie',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage,
    ButtonComponent,
    CurrencyPipe,
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  providers: [
    MovieService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss'
})
export class InfoMovieComponent {
  movieId: string | null = "";
  movie!: MovieDto;
  movieNotFound: boolean = false;

  rentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private toastr: ToastrService) {

      this.rentForm = new FormGroup({
        expirationDate: new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");

    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe({
        next: (value) => {
          this.movie = value
        },
        error: (error) => {
          console.error(error);
          this.movieNotFound = true;
          this.toastr.error(error.message, "FALHA");
        }
      });
    }
  }

  navigateToRentMovie() {
    console.log("navegar..");
  }
}
