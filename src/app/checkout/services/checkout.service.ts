import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
import { CreateOrderRequest, CreateOrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  createOrder(payload: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(this.apiConfig.buildUrl('/orders'), payload);
  }
}
