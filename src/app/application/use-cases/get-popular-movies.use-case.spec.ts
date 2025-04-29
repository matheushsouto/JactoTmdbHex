import { TestBed } from '@angular/core/testing';
import { GetPopularMoviesUseCase } from './get-popular-movies.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { of } from 'rxjs';
import { Movie } from '../../core/models/movie.model';

// Mock do TmdbService
class MockTmdbService {
  getPopularMovies() {
    return of([
      {
        id: 1,
        title: 'The Batman',
        overview: '',
        poster_path: '',
        release_date: '',
        vote_average: 8,
      },
    ]);
  }
}

describe('GetPopularMoviesUseCase', () => {
  let useCase: GetPopularMoviesUseCase;
  let tmdbService: TmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPopularMoviesUseCase,
        { provide: TmdbService, useClass: MockTmdbService },
      ],
    });

    useCase = TestBed.inject(GetPopularMoviesUseCase);
    tmdbService = TestBed.inject(TmdbService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call TmdbService.getPopularMovies and return movies', () => {
    const spy = spyOn(tmdbService, 'getPopularMovies').and.callThrough();

    useCase.execute().subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('The Batman');
    });

    expect(spy).toHaveBeenCalled();
  });
});
