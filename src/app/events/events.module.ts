import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventsRoutes } from './routing/events.routing';

@NgModule({
  declarations: [EventListComponent, EventDetailComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(EventsRoutes)
  ]
})
export class EventsModule {}
