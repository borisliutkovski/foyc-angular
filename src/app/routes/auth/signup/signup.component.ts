import { Component, ChangeDetectionStrategy } from '@angular/core'
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
    private authService: AuthService,
    private router: Router,
  ) { }

  cancel() {
    this.router.navigate(['/'])
  }

  signup(credentials: Credentials) {
    this.authService.signup(credentials)
      .subscribe(() => this.router.navigate(['/']))
  }
}
