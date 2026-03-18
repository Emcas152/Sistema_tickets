import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false
})
export class EmptyStateComponent {
  @Input() title = 'Sin resultados';
  @Input() message = 'No hay datos disponibles en este momento.';
  @Input() actionLabel = '';
  @Input() actionLink = '';
}
