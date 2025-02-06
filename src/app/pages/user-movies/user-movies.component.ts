import { Component, signal } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { AluguelService } from '../../services/aluguel.service';
import { AluguelDto } from '../../types/aluguel-dto.type';
import { ToastrService } from 'ngx-toastr';
import { AluguelStatusEnum } from '../../enums/aluguel-status-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-movies',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    NgOptimizedImage
  ],
  providers: [
    AluguelService
  ],
  templateUrl: './user-movies.component.html',
  styleUrl: './user-movies.component.scss'
})
export class UserMoviesComponent {

  constructor (
    private aluguelService: AluguelService,
    private toastr: ToastrService,
    private router: Router) { }
  
  userMoviesCarregados = signal(false);
  userMovies: AluguelDto[] = [];
  userMoviesPendentes: AluguelDto[] = [];
  userMoviesEmAndamento: AluguelDto[] = [];

  ngOnInit() {
    const userId = sessionStorage.getItem("user-id") ?? "";
    
    this.aluguelService.buscarAlugueisPorUserId(userId).subscribe(
      {
        next: (value) => {
          this.userMoviesCarregados.set(true);
          this.userMovies = value;
          this.userMoviesPendentes = value.filter(m => m.rentalStatus == AluguelStatusEnum.AguardandoRetirada);
          this.userMoviesEmAndamento = value.filter(m => m.rentalStatus == AluguelStatusEnum.EmAndamento);
        },
        error: (error) => {
          this.toastr.error(error.message, "FALHA");

          if (error.message?.includes('token'))
            this.router.navigate(["login"]);
        }
      }
    );
  }

  calcularDataMaximaRetirada(dataString: string | number | Date): string {
    const d = new Date(dataString);
    d.setDate(d.getDate() + 1);
    
    return d.toLocaleDateString();
  }

  formatarData(dataString: string | number | Date): string {
    const d = new Date(dataString);
    
    return d.toLocaleDateString();
  }

  removerAluguel(aluguelId: number) {
    this.aluguelService.cancelarAluguel(aluguelId).subscribe(
      {
        next: () => {
          this.userMoviesPendentes = this.userMoviesPendentes.filter(m => m.id != aluguelId);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error(error.message, "FALHA");
        }
      }
    );
  }
}
