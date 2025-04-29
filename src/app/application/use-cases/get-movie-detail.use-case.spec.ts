import { TestBed } from '@angular/core/testing';
import { GetMovieDetailUseCase } from './get-movie-detail.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { of } from 'rxjs';
import { MovieDetail } from '../../core/models/movie-detail.model';

// Mock do TmdbService
class MockTmdbService {
  getMovieDetail(id: number) {
    return of({
      id,
      title: 'The Batman',
      overview: 'Um filme sobre o Batman.',
      poster_path: '/batman.jpg',
      release_date: '2022-03-04',
      vote_average: 8.2,
    } as MovieDetail);
  }
}

describe('GetMovieDetailUseCase', () => {
  let useCase: GetMovieDetailUseCase;
  let tmdbService: TmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetMovieDetailUseCase,
        { provide: TmdbService, useClass: MockTmdbService },
      ],
    });

    useCase = TestBed.inject(GetMovieDetailUseCase);
    tmdbService = TestBed.inject(TmdbService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call TmdbService.getMovieDetail with the correct id and return movie details', () => {
    const spy = spyOn(tmdbService, 'getMovieDetail').and.callThrough();
    const movieId = 1;

    useCase.execute(movieId).subscribe((movie) => {
      expect(movie).toBeTruthy();
      expect(movie.id).toBe(movieId);
      expect(movie.title).toBe('The Batman');
    });

    expect(spy).toHaveBeenCalledWith(movieId);
  });
});
