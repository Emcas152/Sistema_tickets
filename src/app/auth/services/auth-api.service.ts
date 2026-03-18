import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
import { LoginPayload, LoginResponse } from '../models/auth-session.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService
  ) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiConfig.buildUrl('/login'), payload);
  }
}
