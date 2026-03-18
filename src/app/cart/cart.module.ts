import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartRoutes } from './routing/cart.routing';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(CartRoutes)
  ]
})
export class CartModule {}
