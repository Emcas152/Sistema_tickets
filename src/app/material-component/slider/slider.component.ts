import { Component } from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    standalone: false
})
export class SliderComponent {
  demo = 0;
  val = 50;
  min = 0;
  max = 100;
  disabled = false;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  constructor() { }
}
