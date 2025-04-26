import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './presentation/layout/base-layout.component';
import { MovieListComponent } from './presentation/movie-list/movie-list.component';
import { MovieDetailComponent } from './presentation/movie-detail/movie-detail.component'; // importa aqui também

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: MovieListComponent },
      { path: 'detalhe/:id', component: MovieDetailComponent }
    ],
  },
];
