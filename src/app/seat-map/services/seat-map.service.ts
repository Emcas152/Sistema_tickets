import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
import { ReserveSeatRequest, ReserveSeatResponse } from '../models/seat-map.model';

@Injectable({ providedIn: 'root' })
export class SeatMapService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  reserveSeat(payload: ReserveSeatRequest): Observable<ReserveSeatResponse> {
    return this.http.post<ReserveSeatResponse>(this.apiConfig.buildUrl('/reserve-seat'), payload);
  }
}
