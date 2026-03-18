import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetail } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  standalone: false
})
export class EventDetailComponent implements OnInit {
  event: EventDetail | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));

    if (!eventId) {
      return;
    }

    this.eventsService.getEvent(eventId).subscribe((event) => {
      this.event = event;
    });
  }
}
