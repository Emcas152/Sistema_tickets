import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl
} from '@angular/forms';

@Component({
    selector: 'app-formfield',
    templateUrl: './formfield.component.html',
    styleUrls: ['./formfield.component.scss'],
    standalone: false
})
export class FormfieldComponent {
  options: UntypedFormGroup;

  hide = true;

  constructor(fb: UntypedFormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      color: 'primary',
      fontSize: [16, Validators.min(10)]
    });
  }

  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }
}
