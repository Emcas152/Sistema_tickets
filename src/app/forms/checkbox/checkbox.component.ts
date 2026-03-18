import { Component } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: false
})
export class CheckboxComponent {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  labelPosition = false;
}
