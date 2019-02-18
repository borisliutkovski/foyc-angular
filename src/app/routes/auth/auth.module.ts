import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { UserFormComponent } from './form/user-form.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    UserFormComponent,
  ],
})
export class AuthModule { }
