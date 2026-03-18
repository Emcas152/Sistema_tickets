import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SeatMapComponent } from './components/seat-map/seat-map.component';
import { SeatMapRoutes } from './routing/seat-map.routing';

@NgModule({
  declarations: [SeatMapComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(SeatMapRoutes)
  ]
})
export class SeatMapModule {}
