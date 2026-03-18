import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  isSubmitting = false;
  eventId = 0;

  readonly state$ = this.cartService.state$;
  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    card: ['', [Validators.required, Validators.minLength(16)]],
    expiration: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.cartService.getSnapshot().eventId ?? 0;

    if (!this.eventId) {
      this.router.navigate(['/events']);
    }
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    const cartState = this.cartService.getSnapshot();
    if (!cartState.items.length || !cartState.eventId) {
      return;
    }

    this.isSubmitting = true;
    this.checkoutService.createOrder({
      event_id: cartState.eventId,
      seat_ids: cartState.items.map((item) => item.seatId),
      payment: this.form.getRawValue() as {
        name: string;
        email: string;
        card: string;
        expiration: string;
        cvv: string;
      }
    })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe((response) => {
        this.cartService.clear();
        this.router.navigate(['/checkout/success'], {
          state: {
            order: response,
            eventTitle: response.eventTitle
          }
        });
      });
  }
}
