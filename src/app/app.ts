import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiRoot, TuiTitle } from '@taiga-ui/core';
import { FilmsList } from './components/films-list/films-list';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    TuiRoot,
    TuiTitle,
    FilmsList
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected title = 'Film catalog';
}
