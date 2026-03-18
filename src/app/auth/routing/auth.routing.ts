import { Routes } from '@angular/router';
import { GuestGuard } from '../../core/guards/guest.guard';
import { LoginComponent } from '../components/login/login.component';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
