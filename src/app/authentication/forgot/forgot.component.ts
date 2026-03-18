import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
    standalone: false
})
export class ForgotComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }

  onSubmit() {
    this.router.navigate(['/authentication/login']);
  }
}
