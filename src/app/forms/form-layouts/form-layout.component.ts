import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-formlayout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    standalone: false
})
export class FormLayoutComponent {
  options: UntypedFormGroup;

  constructor(fb: UntypedFormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }
  // For form validator
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  // Sufix and prefix
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }
}
