import { Component, LOCALE_ID } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common'
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
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    MovieService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss'
})
export class InfoMovieComponent {
  pageIndex: number = 0;

  movieId: string | null = "";
  movie!: MovieDto;
  movieNotFound: boolean = false;

  rentForm: FormGroup;

  dateTimeToday = new Date();
  dateTimeTomorrow = this.addDays(this.dateTimeToday, 1);

  totalDays: number = 0;
  totalValue: number = 0;
  dateTimeExpiration: Date | null = null;

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

  navigateBetweenPages() {
    this.pageIndex = this.pageIndex == 0 ? 1 : 0;
  }

  atualizarResumo() {
    const pickDay = document.querySelector('input[name="pick-day"]:checked') as HTMLInputElement;
    const baseDate = pickDay.value == 'hoje' ? this.dateTimeToday : this.dateTimeTomorrow;

    const date = new Date(baseDate.getTime());

    const days = Number((document.getElementById("input-numero-dias") as HTMLInputElement).value);

    if (days > 1000 || days < 0) {
      this.totalDays = 0;
      return;
    }

    date.setDate(date.getDate() + days);

    this.totalDays = days;
    this.totalValue = this.movie.costPerDay * days;
    this.dateTimeExpiration = date;
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  formatDate(date: Date): string {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
