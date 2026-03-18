import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MyTicketsComponent } from '../components/my-tickets/my-tickets.component';

export const TicketsRoutes: Routes = [
  {
    path: 'my-tickets',
    component: MyTicketsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'my-tickets',
    pathMatch: 'full'
  }
];
