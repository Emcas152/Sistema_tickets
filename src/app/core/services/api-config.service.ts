import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  readonly apiUrl = environment.apiUrl;
  readonly seatRefreshMs = environment.seatRefreshMs;
  readonly reservationTtlSeconds = environment.reservationTtlSeconds;

  buildUrl(path: string): string {
    return `${this.apiUrl}/${path.replace(/^\/+/, '')}`;
  }
}
