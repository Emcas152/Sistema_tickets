import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, interval } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CartItem, CartState } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  private readonly expiresAtSubject = new BehaviorSubject<string | null>(null);

  readonly items$ = this.itemsSubject.asObservable();
  readonly expiresAt$ = this.expiresAtSubject.asObservable();
  readonly state$ = combineLatest([this.items$, this.expiresAt$]).pipe(
    map(([items, expiresAt]) => ({
      items,
      expiresAt,
      total: items.reduce((sum, item) => sum + item.price, 0),
      eventId: items[0]?.eventId ?? null
    } as CartState))
  );

  readonly remainingSeconds$ = interval(1000).pipe(
    map(() => this.calculateRemainingSeconds()),
    distinctUntilChanged()
  );

  constructor(private readonly snackBar: MatSnackBar) {
    interval(1000).subscribe(() => {
      if (this.itemsSubject.value.length && this.calculateRemainingSeconds() <= 0) {
        this.clear(true);
      }
    });
  }

  addSeat(item: CartItem, expiresAt: string): void {
    const items = this.itemsSubject.value.filter((entry) => entry.seatId !== item.seatId);
    this.itemsSubject.next([...items, item]);
    this.expiresAtSubject.next(expiresAt);
  }

  removeSeat(seatId: string): void {
    const items = this.itemsSubject.value.filter((item) => item.seatId !== seatId);
    this.itemsSubject.next(items);

    if (!items.length) {
      this.expiresAtSubject.next(null);
    }
  }

  isSelected(seatId: string): boolean {
    return this.itemsSubject.value.some((item) => item.seatId === seatId);
  }

  getSnapshot(): CartState {
    const items = this.itemsSubject.value;
    return {
      items,
      expiresAt: this.expiresAtSubject.value,
      total: items.reduce((sum, item) => sum + item.price, 0),
      eventId: items[0]?.eventId ?? null
    };
  }

  clear(showMessage = false): void {
    this.itemsSubject.next([]);
    this.expiresAtSubject.next(null);

    if (showMessage) {
      this.snackBar.open('La reserva expiró. Selecciona nuevamente tus asientos.', 'Cerrar', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }

  private calculateRemainingSeconds(): number {
    const expiresAt = this.expiresAtSubject.value;

    if (!expiresAt) {
      return 0;
    }

    return Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
  }
}
