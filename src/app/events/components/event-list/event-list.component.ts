import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { debounceTime, finalize, startWith, switchMap } from 'rxjs/operators';
import { EventSummary } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: false
})
export class EventListComponent implements OnInit {
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly page$ = new BehaviorSubject<number>(1);

  events: EventSummary[] = [];
  isLoading = true;

  constructor(private readonly eventsService: EventsService) {}

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(250)),
      this.page$
    ])
      .pipe(
        switchMap(([search, page]) => {
          this.isLoading = true;
          return this.eventsService.getEvents(page, search).pipe(
            finalize(() => (this.isLoading = false))
          );
        })
      )
      .subscribe((response) => {
        this.events = response.data;
      });
  }

  goToPage(page: number): void {
    this.page$.next(page);
  }
}
