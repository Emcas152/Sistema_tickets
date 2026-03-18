import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PurchaseSuccessComponent } from '../components/purchase-success/purchase-success.component';

export const CheckoutRoutes: Routes = [
  {
    path: 'success',
    component: PurchaseSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':eventId',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];
