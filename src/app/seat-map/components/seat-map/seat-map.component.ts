import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { CartService } from '../../../cart/services/cart.service';
import {
  EventDetail,
  EventSeat,
  EventTableLayout,
  EventZone
} from '../../../events/models/event.model';
import { EventsService } from '../../../events/services/events.service';
import { SeatMapService } from '../../services/seat-map.service';

interface VenueSeatView {
  seat: EventSeat;
  left: number;
  top: number;
}

interface VenueTableView {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zone: EventZone;
  zoneName: string;
  zoneColor: string;
  price: number;
  seats: VenueSeatView[];
}

interface VenueZoneSummary {
  name: string;
  color: string;
  price: number;
  available: number;
  sold: number;
}

interface VenueZoneRail {
  name: string;
  color: string;
  top: number;
  height: number;
}

interface TableDraft {
  zone: EventZone;
  seats: EventSeat[];
  label: string;
  layout?: EventTableLayout;
}

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  standalone: false
})
export class SeatMapComponent implements OnInit, OnDestroy {
  venueWidth = 1024;
  venueHeight = 760;
  event: EventDetail | null = null;
  zoneSummary: VenueZoneSummary[] = [];
  zoneRails: VenueZoneRail[] = [];
  venueTables: VenueTableView[] = [];
  readonly remainingSeconds$ = this.cartService.remainingSeconds$;
  readonly remainingLabel$ = this.remainingSeconds$.pipe(
    map((seconds) => `${Math.floor(seconds / 60)}:${`${seconds % 60}`.padStart(2, '0')}`)
  );
  private readonly fallbackTableSlots: Array<{ x: number; y: number; rotation?: number }> = [
    { x: 150, y: 184 },
    { x: 266, y: 184 },
    { x: 382, y: 184 },
    { x: 498, y: 184 },
    { x: 614, y: 184 },
    { x: 714, y: 184 },
    { x: 150, y: 296 },
    { x: 266, y: 296 },
    { x: 382, y: 296 },
    { x: 498, y: 296 },
    { x: 614, y: 296 },
    { x: 714, y: 296 },
    { x: 150, y: 408 },
    { x: 266, y: 408 },
    { x: 382, y: 408 },
    { x: 498, y: 408 },
    { x: 614, y: 408 },
    { x: 704, y: 408, rotation: -12 },
    { x: 218, y: 528 },
    { x: 334, y: 528 },
    { x: 450, y: 528 },
    { x: 566, y: 528 },
    { x: 250, y: 650 },
    { x: 410, y: 650 },
    { x: 570, y: 650 }
  ];

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
        this.syncVenue(event);
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
      this.syncVenue(this.event);
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

      this.syncVenue(this.event!);
    });
  }

  tableStyle(table: VenueTableView): Record<string, string> {
    return {
      left: `${table.x}px`,
      top: `${table.y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
      transform: `translate(-50%, -50%) rotate(${table.rotation}deg)`,
      '--zone-color': table.zoneColor
    };
  }

  seatStyle(table: VenueTableView, seatView: VenueSeatView): Record<string, string> {
    return {
      left: `${seatView.left}px`,
      top: `${seatView.top}px`,
      '--seat-zone-color': table.zoneColor
    };
  }

  seatClass(status: string): string[] {
    return ['seat-node', `seat-${status}`];
  }

  trackByTable(_: number, table: VenueTableView): string {
    return table.id;
  }

  trackBySeat(_: number, seatView: VenueSeatView): string {
    return seatView.seat.id;
  }

  private syncVenue(event: EventDetail): void {
    const decoratedEvent = this.decorateEvent(event);

    this.event = decoratedEvent;
    this.venueWidth = decoratedEvent.venueLayout?.width ?? 1024;
    this.venueHeight = decoratedEvent.venueLayout?.height ?? 760;
    this.zoneSummary = this.buildZoneSummary(decoratedEvent);
    this.zoneRails = this.buildZoneRails(decoratedEvent);
    this.venueTables = this.buildVenueTables(decoratedEvent);
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

  private buildZoneSummary(event: EventDetail): VenueZoneSummary[] {
    return [...event.seatMap]
      .map((zone) => ({
        name: zone.name,
        color: zone.color,
        price: zone.price,
        available: zone.seats.filter((seat) => seat.status === 'available' || seat.status === 'selected').length,
        sold: zone.seats.filter((seat) => seat.status === 'sold').length
      }))
      .sort((left, right) => right.price - left.price);
  }

  private buildZoneRails(event: EventDetail): VenueZoneRail[] {
    const rails = this.buildZoneSummary(event);
    const startTop = 154;
    const totalHeight = 470;
    const gap = 14;
    const laneHeight = Math.max(70, Math.floor((totalHeight - Math.max(rails.length - 1, 0) * gap) / Math.max(rails.length, 1)));

    return rails.map((zone, index) => ({
      name: zone.name.toUpperCase(),
      color: zone.color,
      top: startTop + index * (laneHeight + gap),
      height: laneHeight
    }));
  }

  private buildVenueTables(event: EventDetail): VenueTableView[] {
    let labelIndex = 1;
    let fallbackIndex = 0;
    const tables: VenueTableView[] = [];

    for (const zone of event.seatMap) {
      const draftsResult = this.buildZoneDrafts(zone, labelIndex);
      labelIndex = draftsResult.nextLabelIndex;

      for (const draft of draftsResult.drafts) {
        const usesExplicitPosition = draft.layout?.x != null && draft.layout?.y != null;
        const position = this.resolveTablePosition(draft.layout, fallbackIndex);

        if (!usesExplicitPosition) {
          fallbackIndex += 1;
        }

        const width = draft.layout?.width ?? zone.layout?.tableWidth ?? this.resolveTableWidth(draft.seats.length);
        const height = draft.layout?.height ?? zone.layout?.tableHeight ?? this.resolveTableHeight(draft.seats.length);

        tables.push({
          id: `${zone.id}-${draft.label}`,
          label: draft.label,
          x: position.x,
          y: position.y,
          width,
          height,
          rotation: position.rotation,
          zone,
          zoneName: zone.name,
          zoneColor: zone.color,
          price: zone.price,
          seats: this.buildTableSeats(draft.seats, width, height)
        });
      }
    }

    return tables;
  }

  private buildZoneDrafts(zone: EventZone, labelIndexStart: number): { drafts: TableDraft[]; nextLabelIndex: number } {
    const drafts: TableDraft[] = [];
    const sortedSeats = [...zone.seats].sort((left, right) => {
      if (left.row !== right.row) {
        return left.row.localeCompare(right.row);
      }

      if (left.number !== right.number) {
        return left.number - right.number;
      }

      return left.label.localeCompare(right.label);
    });
    const seatById = new Map(sortedSeats.map((seat) => [seat.id, seat]));
    const usedSeats = new Set<string>();
    const seatsPerTable = zone.layout?.seatsPerTable ?? this.resolveSeatsPerTable(zone);

    for (const tableLayout of zone.layout?.tables ?? []) {
      let seats = this.pickConfiguredSeats(tableLayout, seatById, usedSeats);

      if (!seats.length) {
        seats = this.takeUnusedSeats(sortedSeats, usedSeats, seatsPerTable);
      }

      if (!seats.length) {
        continue;
      }

      drafts.push({
        zone,
        seats,
        label: tableLayout.label ?? String(labelIndexStart++),
        layout: tableLayout
      });
    }

    const remainingSeats = sortedSeats.filter((seat) => !usedSeats.has(seat.id));

    for (const chunk of this.chunkSeats(remainingSeats, seatsPerTable)) {
      drafts.push({
        zone,
        seats: chunk,
        label: String(labelIndexStart++)
      });
    }

    return {
      drafts,
      nextLabelIndex: labelIndexStart
    };
  }

  private pickConfiguredSeats(
    tableLayout: EventTableLayout,
    seatById: Map<string, EventSeat>,
    usedSeats: Set<string>
  ): EventSeat[] {
    if (!tableLayout.seatIds?.length) {
      return [];
    }

    const seats: EventSeat[] = [];

    for (const seatId of tableLayout.seatIds) {
      const seat = seatById.get(seatId);

      if (!seat || usedSeats.has(seatId)) {
        continue;
      }

      usedSeats.add(seatId);
      seats.push(seat);
    }

    return seats;
  }

  private takeUnusedSeats(seats: EventSeat[], usedSeats: Set<string>, limit: number): EventSeat[] {
    const pickedSeats: EventSeat[] = [];

    for (const seat of seats) {
      if (usedSeats.has(seat.id)) {
        continue;
      }

      usedSeats.add(seat.id);
      pickedSeats.push(seat);

      if (pickedSeats.length === limit) {
        break;
      }
    }

    return pickedSeats;
  }

  private chunkSeats(seats: EventSeat[], chunkSize: number): EventSeat[][] {
    const chunks: EventSeat[][] = [];

    for (let index = 0; index < seats.length; index += chunkSize) {
      chunks.push(seats.slice(index, index + chunkSize));
    }

    return chunks;
  }

  private resolveTablePosition(
    tableLayout: EventTableLayout | undefined,
    fallbackIndex: number
  ): { x: number; y: number; rotation: number } {
    if (tableLayout?.x != null && tableLayout?.y != null) {
      return {
        x: tableLayout.x,
        y: tableLayout.y,
        rotation: tableLayout.rotation ?? 0
      };
    }

    const fallbackSlot = this.fallbackTableSlots[fallbackIndex];

    if (fallbackSlot) {
      return {
        x: fallbackSlot.x,
        y: fallbackSlot.y,
        rotation: fallbackSlot.rotation ?? 0
      };
    }

    const overflowIndex = fallbackIndex - this.fallbackTableSlots.length;
    const columns = 4;
    const row = Math.floor(overflowIndex / columns);
    const column = overflowIndex % columns;

    return {
      x: 180 + column * 148,
      y: 660 + row * 112,
      rotation: 0
    };
  }

  private resolveSeatsPerTable(zone: EventZone): number {
    if (zone.seats.length <= 12) {
      return 4;
    }

    if (zone.seats.length <= 32) {
      return 6;
    }

    return 8;
  }

  private resolveTableWidth(seatCount: number): number {
    if (seatCount >= 8) {
      return 88;
    }

    if (seatCount >= 6) {
      return 82;
    }

    return 74;
  }

  private resolveTableHeight(seatCount: number): number {
    if (seatCount >= 8) {
      return 64;
    }

    if (seatCount >= 6) {
      return 60;
    }

    return 56;
  }

  private buildTableSeats(seats: EventSeat[], width: number, height: number): VenueSeatView[] {
    const totalSeats = Math.max(seats.length, 1);
    const radiusX = width / 2 + 18;
    const radiusY = height / 2 + 18;

    return seats.map((seat, index) => {
      const angle = ((index / totalSeats) * Math.PI * 2) - (Math.PI / 2);

      return {
        seat,
        left: Math.round(width / 2 + Math.cos(angle) * radiusX),
        top: Math.round(height / 2 + Math.sin(angle) * radiusY)
      };
    });
  }
}
