import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { GetPopularMoviesUseCase } from '../../application/use-cases/get-popular-movies.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { of } from 'rxjs';
import { Movie } from '../../core/models/movie.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'The Batman',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: 8,
  },
  {
    id: 2,
    title: 'Spider-Man',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: 7.5,
  },
];

class MockGetPopularMoviesUseCase {
  execute() {
    return of(mockMovies);
  }
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent, HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: GetPopularMoviesUseCase,
          useClass: MockGetPopularMoviesUseCase,
        },
        TmdbService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies', () => {
    expect(component.movies().length).toBe(0);
  });

  it('should filter movies by title', () => {
    component.filterText = 'spider';
    fixture.detectChanges();
    expect(component.filteredMovies.length).toBe(0);
  });

  it('should detect when there are no results after filtering', () => {
    component.filterText = 'does not exist';
    fixture.detectChanges();
    expect(component.noResults()).toBeFalse();
    expect(component.filteredMovies.length).toBe(0);
  });

  it('should not be loading if movies are already available', () => {
    expect(component.loadingAndNoResults()).toBeTrue();
  });
});
