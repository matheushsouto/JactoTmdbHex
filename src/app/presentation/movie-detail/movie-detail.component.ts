import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetMovieDetailUseCase } from '../../application/use-cases/get-movie-detail.use-case';
import { TmdbService } from '../../infrastructure/tmdb.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [GetMovieDetailUseCase, TmdbService],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly getMovieDetailUseCase = inject(GetMovieDetailUseCase);
  private readonly movieId = Number(this.route.snapshot.paramMap.get('id'));

  private readonly movieDetail = toSignal(
    this.getMovieDetailUseCase.execute(this.movieId),
    { initialValue: null }
  );

  readonly movie = computed(() => this.movieDetail());
}
