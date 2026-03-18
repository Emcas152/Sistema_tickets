import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SeatMapComponent } from '../components/seat-map/seat-map.component';

export const SeatMapRoutes: Routes = [
  {
    path: ':eventId',
    component: SeatMapComponent,
    canActivate: [AuthGuard]
  }
];
