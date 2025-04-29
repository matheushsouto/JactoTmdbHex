import { TestBed } from '@angular/core/testing';
import { TmdbService } from './tmdb.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../core/models/movie.model';
import { MovieDetail } from '../core/models/movie-detail.model';
import { environment } from '../../environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  const mockMovies: Movie[] = [
    { id: 1, title: 'The Batman', overview: '', poster_path: '', release_date: '', vote_average: 8 },
    { id: 2, title: 'Spider-Man: No Way Home', overview: '', poster_path: '', release_date: '', vote_average: 7.5 }
  ];

  const mockMovieDetail: MovieDetail = {
    id: 1,
    title: 'The Batman',
    overview: 'Details about Batman movie',
    poster_path: '/batman.jpg',
    release_date: '2022-03-04',
    vote_average: 8.2,
    runtime: 0,
    genres: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbService]
    });

    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch popular movies from the API and cache them', () => {
    service.getPopularMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/popular?language=pt-BR`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockMovies });

    // Second call should return from cache
    service.getPopularMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    httpMock.expectNone(`${environment.tmdbApiUrl}/movie/popular?language=pt-BR`);
  });

  it('should fetch movie detail from the API and cache it', () => {
    const movieId = 1;

    service.getMovieDetail(movieId).subscribe(movieDetail => {
      expect(movieDetail).toEqual(mockMovieDetail);
    });

    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}?language=pt-BR`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetail);

    service.getMovieDetail(movieId).subscribe(movieDetail => {
      expect(movieDetail).toEqual(mockMovieDetail);
    });

    httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}?language=pt-BR`);
  });
});
