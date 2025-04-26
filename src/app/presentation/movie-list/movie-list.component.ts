import { Component, inject, computed } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetPopularMoviesUseCase } from '../../application/use-cases/get-popular-movies.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [GetPopularMoviesUseCase, TmdbService],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  private readonly getPopularMoviesUseCase = inject(GetPopularMoviesUseCase);

  private readonly moviesSignal = toSignal(
    this.getPopularMoviesUseCase.execute(),
    { initialValue: [] }
  );

  readonly movies = computed(() => this.moviesSignal());
}
