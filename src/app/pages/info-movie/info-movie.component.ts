import { Component, LOCALE_ID, signal } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { MovieService } from '../../services/movie.service';
import { MovieDto } from '../../types/movie-dto.type';
import { ToastrService } from 'ngx-toastr';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AluguelService } from '../../services/aluguel.service';
import { CriarAluguelRequest } from '../../types/request/criar-aluguel.type';
import { AluguelStatusEnum } from '../../enums/aluguel-status-enum';
import { PagamentoStatusEnum } from '../../enums/pagamento-status-enum';
import { MovieStatusEnum } from '../../enums/movie-status-enum';

import { SafePipe } from '../../pipes/safe.pipe';

registerLocaleData(ptBr);

@Component({
  selector: 'app-info-movie',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage,
    ButtonComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    CommonModule,
    SafePipe
  ],
  providers: [
    MovieService,
    AluguelService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss'
})
export class InfoMovieComponent {
  pageIndex: number = 0;
  movieStatus = MovieStatusEnum;

  movieId: string | null = "";
  movie!: MovieDto;
  movieNotFound: boolean = false;

  rentForm: FormGroup;

  dateTimeToday = new Date();
  dateTimeTomorrow = this.addDays(this.dateTimeToday, 1);

  totalDays: number = 0;
  totalValue: number = 0;
  dateTimeExpiration: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private aluguelService: AluguelService,
    private toastr: ToastrService,
    private router: Router) {

    this.rentForm = new FormGroup({
      expirationDate: new FormControl('', [Validators.required])
    });
  }

  loadingMovie = signal(true);

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");

    if (this.movieId) {
      this.movieService.buscarPeloId(this.movieId).subscribe({
        next: (value) => {
          this.movie = value;
          this.loadingMovie.set(false);
        },
        error: (error) => {
          console.error(error);
          this.movieNotFound = true;
          this.toastr.error(error.message, "FALHA");
          this.loadingMovie.set(false);
        }
      });
    }
  }

  handleImageError(event: any) {
    event.target.src = './default-banner-image.jpg';
  }

  navigateBetweenPages() {
    this.pageIndex = this.pageIndex == 0 ? 1 : 0;

    if (this.pageIndex == 1 && !sessionStorage.getItem("auth-token")) {
      this.router.navigate(["login"]);
    }
  }

  requestLoading = signal(false);

  confirmarAluguel() {
    this.requestLoading.set(true);
    const userId = sessionStorage.getItem("user-id") ?? "";

    const dadosAluguel: CriarAluguelRequest = {
      userId: userId,
      movieId: Number(this.movieId),
      rentalStartDate: this.formatDate(this.dateTimeToday),
      rentalEndDate: this.formatDate(this.dateTimeExpiration),
      rentalStatus: AluguelStatusEnum.AguardandoRetirada,
      paymentStatus: PagamentoStatusEnum.Pendente
    };

    this.aluguelService.criarAluguel(dadosAluguel)
      .subscribe({
        next: () => {
          this.toastr.success("Seu filme te espera!", "CONFIRMADO");
          this.requestLoading.set(false);

          this.router.navigate(['user-movies']);
        },
        error: (error) => {
          if (error.message.includes("NÃO FINALIZADO")) {
            this.toastr.warning('Este filme já está alugado!', "FALHA");
          }
          else if (error.message.includes("token")) {
            this.toastr.error(error.message, "FALHA");
            this.router.navigate(['login']);
          }
          else {
            this.toastr.error(error.message, "FALHA");
          }

          this.requestLoading.set(false);
        }
      });
  }

  atualizarResumo() {
    const pickDay = document.querySelector('input[name="pick-day"]:checked') as HTMLInputElement;
    const baseDate = pickDay.value == 'hoje' ? this.dateTimeToday : this.dateTimeTomorrow;

    const date = new Date(baseDate.getTime());
    const days = Number((document.getElementById("select-numero-dias") as HTMLInputElement).value);

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

  formatDate(date: Date | null): string {
    if (!date) return '';

    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  isDesktopView() : boolean {
    return window.innerWidth > 1000;
  }

  isTraillerVisible: boolean = false;
  changeTraillerVisibility() {
    this.isTraillerVisible = !this.isTraillerVisible;
    return this.isTraillerVisible;
  }

  navigateToMainPage() {
    this.router.navigate([""]);
  }
}
