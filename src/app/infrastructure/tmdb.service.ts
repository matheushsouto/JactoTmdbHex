import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Movie } from '../core/models/movie.model';
import { MovieDetail } from '../core/models/movie-detail.model';
import { environment } from '../../environments/environment';

export class TmdbService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.tmdbApiUrl;
  private popularMoviesCache: Movie[] | null = null;
  private movieDetailsCache = new Map<number, MovieDetail>();

  getPopularMovies(): Observable<Movie[]> {
    if (this.popularMoviesCache) {
      return of(this.popularMoviesCache);
    }

    return this.fetchPopularMovies();
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    const cachedMovieDetail = this.movieDetailsCache.get(id);
    if (cachedMovieDetail) {
      return of(cachedMovieDetail);
    }

    return this.fetchMovieDetail(id);
  }

  private fetchPopularMovies(): Observable<Movie[]> {
    const url = this.buildUrl('/movie/popular');

    return this.httpClient.get<{ results: Movie[] }>(url).pipe(
      map(response => response.results),
      tap(movies => this.popularMoviesCache = movies)
    );
  }

  private fetchMovieDetail(id: number): Observable<MovieDetail> {
    const url = this.buildUrl(`/movie/${id}`);

    return this.httpClient.get<MovieDetail>(url).pipe(
      tap(movieDetail => this.movieDetailsCache.set(id, movieDetail))
    );
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}?language=pt-BR`;
  }
}
