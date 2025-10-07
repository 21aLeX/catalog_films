import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDialogContext, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiChip, TuiPin } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { Film } from '../../models/film/film';

@Component({
  selector: 'app-template-modal',
  standalone: true,
  imports: [CommonModule, TuiAvatar, TuiChip, TuiTitle, TuiPin],
  templateUrl: './template-modal.html',
  styleUrl: './template-modal.less',
})
export class TemplateModal {
  readonly context = inject<TuiDialogContext<void, Film>>(POLYMORPHEUS_CONTEXT);
}
