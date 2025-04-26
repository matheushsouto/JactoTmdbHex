import { Component, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetPopularMoviesUseCase } from '../../application/use-cases/get-popular-movies.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../core/models/movie.model';

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
    FormsModule,
  ],
  providers: [GetPopularMoviesUseCase, TmdbService],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  private readonly getPopularMoviesUseCase = inject(GetPopularMoviesUseCase);

  private readonly moviesSignal = toSignal(
    this.getPopularMoviesUseCase.execute(),
    { initialValue: null }
  );

  readonly movies: Signal<Movie[]> = computed(() => this.moviesSignal() || []);

  public filterText: string = '';

  get filteredMovies() {
    return this.movies().filter(movie =>
      movie.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  readonly loadingAndNoResults = computed(() => this.moviesSignal() === null && this.filteredMovies.length === 0);
  readonly noResults = computed(() => this.moviesSignal() !== null && this.filteredMovies.length === 0);
}
