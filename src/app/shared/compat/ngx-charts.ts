import { Directive, EventEmitter, Input, NgModule, Output } from '@angular/core';

@Directive({
  selector: `
    ngx-charts-bar-vertical,
    ngx-charts-bar-horizontal,
    ngx-charts-bar-vertical-2d,
    ngx-charts-bar-horizontal-2d,
    ngx-charts-pie-chart,
    ngx-charts-advanced-pie-chart
  `,
  standalone: false
})
export class NgxChartsStubDirective {
  @Input() scheme: unknown;
  @Input() schemeType: unknown;
  @Input() results: unknown;
  @Input() gradient: unknown;
  @Input() xAxis: unknown;
  @Input() yAxis: unknown;
  @Input() legend: unknown;
  @Input() showXAxisLabel: unknown;
  @Input() showYAxisLabel: unknown;
  @Input() tooltipDisabled: unknown;
  @Input() xAxisLabel: unknown;
  @Input() yAxisLabel: unknown;
  @Input() showGridLines: unknown;
  @Input() barPadding: unknown;
  @Input() view: unknown;
  @Input() roundDomains: unknown;
  @Input() groupPadding: unknown;
  @Input() labels: unknown;
  @Input() doughnut: unknown;
  @Input() arcWidth: unknown;
  @Input() explodeSlices: unknown;

  @Output() select = new EventEmitter<unknown>();
  @Output() legendLabelClick = new EventEmitter<unknown>();
}

@NgModule({
  declarations: [NgxChartsStubDirective],
  exports: [NgxChartsStubDirective]
})
export class NgxChartsModule {}
