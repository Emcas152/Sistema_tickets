import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { CartService } from '../../../cart/services/cart.service';
import { EventDetail, EventSeat, EventZone } from '../../../events/models/event.model';
import { EventsService } from '../../../events/services/events.service';
import { SeatMapService } from '../../services/seat-map.service';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  standalone: false
})
export class SeatMapComponent implements OnInit, OnDestroy {
  event: EventDetail | null = null;
  readonly remainingSeconds$ = this.cartService.remainingSeconds$;
  readonly remainingLabel$ = this.remainingSeconds$.pipe(
    map((seconds) => `${Math.floor(seconds / 60)}:${`${seconds % 60}`.padStart(2, '0')}`)
  );

  private readonly destroy$ = new Subject<void>();
  private eventId = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiConfig: ApiConfigService,
    private readonly eventsService: EventsService,
    private readonly seatMapService: SeatMapService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));

    if (!this.eventId) {
      return;
    }

    timer(0, this.apiConfig.seatRefreshMs)
      .pipe(
        switchMap(() => this.eventsService.getEvent(this.eventId)),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.event = this.decorateEvent(event);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectSeat(zone: EventZone, seat: EventSeat): void {
    if (!this.event) {
      return;
    }

    if (seat.status === 'selected') {
      this.cartService.removeSeat(seat.id);
      this.event = this.decorateEvent(this.event);
      return;
    }

    if (seat.status !== 'available') {
      return;
    }

    this.seatMapService.reserveSeat({
      eventId: this.event.id,
      seatId: seat.id
    }).subscribe((reservation) => {
      this.cartService.addSeat({
        eventId: this.event!.id,
        eventTitle: this.event!.title,
        venue: this.event!.venue,
        startsAt: this.event!.startsAt,
        seatId: seat.id,
        seatLabel: seat.label,
        zoneName: zone.name,
        price: seat.price,
        holdToken: reservation.holdToken
      }, reservation.expiresAt);

      this.event = this.decorateEvent(this.event!);
    });
  }

  seatClass(status: string): string {
    return `seat seat-${status}`;
  }

  private decorateEvent(event: EventDetail): EventDetail {
    return {
      ...event,
      seatMap: event.seatMap.map((zone) => ({
        ...zone,
        seats: zone.seats.map((seat) => ({
          ...seat,
          status: this.cartService.isSelected(seat.id) ? 'selected' : seat.status
        }))
      }))
    };
  }
}
