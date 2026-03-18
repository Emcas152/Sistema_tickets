import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    return this.sessionService.isAuthenticated()
      ? this.router.createUrlTree(['/events'])
      : true;
  }
}
