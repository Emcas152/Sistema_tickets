import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent {
  @Input() title = 'Tu carrito';

  readonly state$ = this.cartService.state$;
  readonly remainingMinutes$: Observable<string> = this.cartService.remainingSeconds$.pipe(
    map((seconds) => `${Math.floor(seconds / 60)}:${`${seconds % 60}`.padStart(2, '0')}`)
  );

  constructor(private readonly cartService: CartService) {}

  removeSeat(seatId: string): void {
    this.cartService.removeSeat(seatId);
  }
}
