import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { GetMovieDetailUseCase } from '../../application/use-cases/get-movie-detail.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockMovie = {
  id: 1,
  title: 'The Batman',
  overview: 'Um filme sobre o Batman.',
  poster_path: '/batman.jpg',
  release_date: '2022-03-04',
  vote_average: 8.2,
};

class MockGetMovieDetailUseCase {
  execute(id: number) {
    return of(mockMovie);
  }
}

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        if (key === 'id') return '1';
        return null;
      }
    }
  }
};

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: GetMovieDetailUseCase, useClass: MockGetMovieDetailUseCase },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        TmdbService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
