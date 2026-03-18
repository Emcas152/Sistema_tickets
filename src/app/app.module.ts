
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';


import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DemoMaterialModule } from './demo-material-module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { mailService, mailGlobalVariable } from './apps/mailbox/mail.service';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { environment } from '../environments/environment';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({ declarations: [
        AppComponent,
        FullComponent,
        VerticalAppHeaderComponent,
        SpinnerComponent,
        AppBlankComponent,
        VerticalAppSidebarComponent,
        AppBreadcrumbComponent,
        HorizontalAppHeaderComponent,
        HorizontalAppSidebarComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        CoreModule,
        PerfectScrollbarModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes, {}),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        mailService, mailGlobalVariable,
        DatePipe,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
