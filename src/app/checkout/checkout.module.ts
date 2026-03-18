import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PurchaseSuccessComponent } from './components/purchase-success/purchase-success.component';
import { CheckoutRoutes } from './routing/checkout.routing';

@NgModule({
  declarations: [CheckoutComponent, PurchaseSuccessComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(CheckoutRoutes)
  ]
})
export class CheckoutModule {}
