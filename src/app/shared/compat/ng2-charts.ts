import { Directive, EventEmitter, Input, NgModule, Output } from '@angular/core';

@Directive({
  selector: 'canvas[baseChart]',
  exportAs: 'base-chart',
  standalone: false
})
export class BaseChartDirective {
  @Input() datasets: unknown;
  @Input() labels: unknown;
  @Input() options: unknown;
  @Input() legend: unknown;
  @Input() chartType: unknown;
  @Input() colors: unknown;
  @Input() data: unknown;
  @Input() plugins: unknown;

  @Output() chartClick = new EventEmitter<unknown>();
  @Output() chartHover = new EventEmitter<unknown>();

  update(): void {}

  refresh(): void {}
}

@NgModule({
  declarations: [BaseChartDirective],
  exports: [BaseChartDirective]
})
export class ChartsModule {}
