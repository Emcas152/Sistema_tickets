import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SessionService } from '../../../core/services/session.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  isSubmitting = false;

  readonly form = this.fb.group({
    email: ['cliente@alconproducciones.com', [Validators.required, Validators.email]],
    password: ['secret123', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authApi: AuthApiService,
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authApi.login(this.form.getRawValue() as { email: string; password: string; })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe((session) => {
        this.sessionService.saveSession(session);
        this.router.navigate(['/events']);
      });
  }
}
