import { Component, Directive, InjectionToken, Input, NgModule } from '@angular/core';

export interface PerfectScrollbarConfigInterface {
  [key: string]: unknown;
}

export const PERFECT_SCROLLBAR_CONFIG =
  new InjectionToken<PerfectScrollbarConfigInterface>('PERFECT_SCROLLBAR_CONFIG');

@Directive({
  selector: '[perfectScrollbar]',
  standalone: false
})
export class PerfectScrollbarDirective {
  @Input() perfectScrollbar: PerfectScrollbarConfigInterface | '' = '';
}

@Component({
  selector: 'perfect-scrollbar',
  template: '<ng-content></ng-content>',
  standalone: false
})
export class PerfectScrollbarComponent {
  @Input() config: PerfectScrollbarConfigInterface | null = null;
}

@NgModule({
  declarations: [PerfectScrollbarDirective, PerfectScrollbarComponent],
  exports: [PerfectScrollbarDirective, PerfectScrollbarComponent]
})
export class PerfectScrollbarModule {}
