import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
import { TicketRecord } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  getMyTickets(): Observable<TicketRecord[]> {
    return this.http.get<TicketRecord[]>(this.apiConfig.buildUrl('/my-tickets'));
  }
}
