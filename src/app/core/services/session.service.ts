import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionUser, UserSession } from '../models/user-session.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly storageKey = 'alcon_session';
  private readonly sessionSubject = new BehaviorSubject<UserSession | null>(this.readSession());

  readonly session$ = this.sessionSubject.asObservable();

  get token(): string | null {
    return this.sessionSubject.value?.token ?? null;
  }

  get user(): SessionUser | null {
    return this.sessionSubject.value?.user ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  saveSession(session: UserSession): void {
    localStorage.setItem(this.storageKey, JSON.stringify(session));
    this.sessionSubject.next(session);
  }

  clearSession(): void {
    localStorage.removeItem(this.storageKey);
    this.sessionSubject.next(null);
  }

  private readSession(): UserSession | null {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserSession;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
