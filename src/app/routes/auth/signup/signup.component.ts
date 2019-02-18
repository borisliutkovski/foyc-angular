import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Location } from '@angular/common'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Credentials } from 'src/app/models/credentials'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
  ) { }

  cancel() {
    this.location.back()
  }

  signup(credentials: Credentials) {
    this.authService.signup(credentials)
      .subscribe(() => this.router.navigate(['/']))
  }
}
