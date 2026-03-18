import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { TicketsRoutes } from './routing/tickets.routing';

@NgModule({
  declarations: [MyTicketsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(TicketsRoutes)
  ]
})
export class TicketsModule {}
