import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
import { EventDetail, EventListResponse } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  getEvents(page = 1, search = ''): Observable<EventListResponse> {
    let params = new HttpParams().set('page', String(page));

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<EventListResponse>(this.apiConfig.buildUrl('/events'), { params });
  }

  getEvent(eventId: number): Observable<EventDetail> {
    return this.http.get<EventDetail>(this.apiConfig.buildUrl(`/events/${eventId}`));
  }
}
