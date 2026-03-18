import { Component } from '@angular/core';

@Component({
    selector: 'app-slide-toggle',
    templateUrl: './slide-toggle.component.html',
    styleUrls: ['./slide-toggle.component.scss'],
    standalone: false
})
export class SlideToggleComponent {
  color = 'accent';
  checked = false;
  disabled = false;
}
