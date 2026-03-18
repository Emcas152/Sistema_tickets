import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';
import { CartComponent } from '../cart/components/cart/cart.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CartComponent,
    EmptyStateComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DemoMaterialModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DemoMaterialModule,
    PerfectScrollbarModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CartComponent,
    EmptyStateComponent,
    PageHeaderComponent
  ],
  providers: [MenuItems, HorizontalMenuItems]
})
export class SharedModule { }
