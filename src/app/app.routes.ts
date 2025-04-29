import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './presentation/layout/base-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/movie-list/movie-list.component').then(
            (c) => c.MovieListComponent
          ),
      },
      {
        path: 'detalhe/:id',
        loadComponent: () =>
          import('./presentation/movie-detail/movie-detail.component').then(
            (c) => c.MovieDetailComponent
          ),
      },
    ],
  },
];
