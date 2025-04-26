import { inject } from '@angular/core';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { Observable } from 'rxjs';
import { Movie } from '../../core/models/movie.model';
import { MovieDetail } from '../../core/models/movie-detail.model';

export class GetMovieDetailUseCase {
  private tmdb = inject(TmdbService);

  execute(id: number): Observable<MovieDetail> {
    return this.tmdb.getMovieDetail(id);
  }
}
