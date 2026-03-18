import { Routes } from '@angular/router';
import { EventDetailComponent } from '../components/event-detail/event-detail.component';
import { EventListComponent } from '../components/event-list/event-list.component';

export const EventsRoutes: Routes = [
  {
    path: '',
    component: EventListComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: EventDetailComponent
  }
];
