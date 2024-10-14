import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MainComponent } from './pages/main/main.component';
import { InfoMovieComponent } from './pages/info-movie/info-movie.component';
import { UserMoviesComponent } from './pages/user-movies/user-movies.component';

export const routes: Routes = [
    {
        path: "",
        component: MainComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "cadastro",
        component: CadastroComponent
    },
    {
        path: "filme/:id",
        component: InfoMovieComponent
    },
    {
        path: "user-movies",
        component: UserMoviesComponent
    }
];
