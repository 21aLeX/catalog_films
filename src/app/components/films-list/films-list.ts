import { Component, inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiDialogService, TuiTextfield, TuiIcon, TuiLoader, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiBlockDetails } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { catchError, map, of } from 'rxjs';
import { KinopoiskApiService } from '../../services/kinopoiskApiService/kinopoisk-api-service';
import { Film } from '../../models/film/film';
import { TemplateModal } from '../modal/template-modal';


@Component({
  selector: 'app-films-list',
  imports: [
    CommonModule,
    FormsModule,
    TuiIcon,
    TuiAvatar,
    TuiDataListWrapper,
    TuiBlockDetails,
    TuiTitle,
    TuiTextfield,
    TuiLoader
  ],
  templateUrl: './films-list.html',
  styleUrl: './films-list.less',
})
export class FilmsList implements OnInit {
  private readonly kinopoiskApiService = inject(KinopoiskApiService);
  private readonly injector = inject(Injector);
  private readonly dialogs = inject(TuiDialogService);

  public movieTitles: string[] = [];
  public showLoader = true;
  public notFilms = false;

  protected films: Film[] = [];
  protected filteredFilms: Film[] = [];

  protected kino$ = this.kinopoiskApiService.get();

  protected trackByIndex(index: number): number {
    return index;
  }
  public showDialog(film: Film): void {
    const content = new PolymorpheusComponent(TemplateModal, this.injector);
    this.dialogs.open(content, { size: 's', data: film }).subscribe();
  }
  protected value = '';

  ngOnInit(): void {
    this.kino$
      .pipe(
        map((films: Film[] | null | undefined) => films ?? []),
        catchError(() => { this.notFilms = true; return of([]); })
      )
      .subscribe(films => {
        // для отображения лоадера на 2сек
        setTimeout(() => {
          this.films = films;
          this.filteredFilms = films;
          this.movieTitles = films.map(f => f.title);
          this.notFilms = films.length === 0;
          this.showLoader = false;
        }, 2000)
      });
  }

  protected applyFilter(): void {
    const request = this.value.trim().toLowerCase();
    this.filteredFilms = request
      ? this.films.filter(f =>
        (f.title || '').toLowerCase().includes(request)
      )
      : this.films;
  }
}
