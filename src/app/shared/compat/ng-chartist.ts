import { Component, Input, NgModule } from '@angular/core';

export type ChartType = 'Bar' | 'Line' | 'Pie';
export type ChartEvent = unknown;

@Component({
  selector: 'x-chartist',
  template: '',
  standalone: false
})
export class ChartistComponent {
  @Input() data: unknown;
  @Input() type: unknown;
  @Input() options: unknown;
  @Input() responsiveOptions: unknown;
  @Input() events: unknown;
}

@NgModule({
  declarations: [ChartistComponent],
  exports: [ChartistComponent]
})
export class ChartistModule {}
