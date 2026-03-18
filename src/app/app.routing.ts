import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/events',
                pathMatch: 'full'
            },
             {
                path: 'dashboard',
                redirectTo: '/events',
                pathMatch: 'full'
            },
            {
                path: 'events',
                loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
            },
            {
                path: 'seat-map',
                loadChildren: () => import('./seat-map/seat-map.module').then(m => m.SeatMapModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'checkout',
                loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
            },
            {
                path: 'tickets',
                loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
            },
            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'apps',
                loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
            },
            {
                path: 'forms',
                loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
            },
            {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            },
            {
                path: 'tree',
                loadChildren: () => import('./tree/tree.module').then(m => m.TreeModule)
            },
            {
                path: 'datatables',
                loadChildren: () => import('./datatables/datatables.module').then(m => m.DataTablesModule)
            },
            {
                path: 'pages',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            },
            {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            },
            {
                path: 'charts',
                loadChildren: () => import('./charts/chartslib.module').then(m => m.ChartslibModule)
            },
            {
                path: 'multi',
                loadChildren: () => import('./multi-dropdown/multi-dd.module').then(m => m.MultiModule)
            }
        ]
    },
    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'authentication',
                redirectTo: 'auth/login',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
