import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutes } from './routing/auth.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthModule {}
