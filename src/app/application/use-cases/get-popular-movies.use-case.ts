import { inject } from '@angular/core';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { Observable } from 'rxjs';
import { Movie } from '../../core/models/movie.model';

export class GetPopularMoviesUseCase {
  private tmdb = inject(TmdbService);

  execute(): Observable<Movie[]> {
    return this.tmdb.getPopularMovies();
  }
}
