import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CartComponent } from '../components/cart/cart.component';

export const CartRoutes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];
