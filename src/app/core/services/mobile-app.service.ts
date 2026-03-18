import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Capacitor } from '@capacitor/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MobileAppService {
  private initialized = false;
  private readonly deviceTokenSubject = new BehaviorSubject<string | null>(null);

  readonly deviceToken$ = this.deviceTokenSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly snackBar: MatSnackBar
  ) {}

  async init(): Promise<void> {
    if (this.initialized || !Capacitor.isNativePlatform()) {
      return;
    }

    this.initialized = true;

    await this.registerDeepLinks();
    await this.registerPushNotifications();
    await this.hideSplash();
  }

  private async hideSplash(): Promise<void> {
    try {
      await SplashScreen.hide();
    } catch {
      // Ignore splash failures on unsupported environments.
    }
  }

  private async registerDeepLinks(): Promise<void> {
    await App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const target = this.extractRoute(event.url);

      if (!target) {
        return;
      }

      this.ngZone.run(() => void this.router.navigateByUrl(target));
    });
  }

  private async registerPushNotifications(): Promise<void> {
    const permissions = await PushNotifications.checkPermissions();
    const granted = permissions.receive === 'granted'
      ? permissions
      : await PushNotifications.requestPermissions();

    if (granted.receive !== 'granted') {
      return;
    }

    await PushNotifications.register();

    await PushNotifications.addListener('registration', (token: Token) => {
      this.deviceTokenSubject.next(token.value);
    });

    await PushNotifications.addListener('registrationError', (error) => {
      this.snackBar.open(`No fue posible registrar push notifications: ${error.error}`, 'Cerrar', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      this.snackBar.open(notification.title ?? 'Nueva notificación', notification.body ?? 'Abrir', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      const route = notification.notification.data?.route as string | undefined;

      if (!route) {
        return;
      }

      this.ngZone.run(() => void this.router.navigateByUrl(route));
    });
  }

  private extractRoute(rawUrl: string): string | null {
    try {
      const url = new URL(rawUrl);
      const normalizedPath = url.protocol.startsWith('http')
        ? `${url.pathname}${url.search}${url.hash}`
        : `/${url.host}${url.pathname}${url.search}${url.hash}`;

      return normalizedPath === '/' ? '/events' : normalizedPath;
    } catch {
      return null;
    }
  }
}
