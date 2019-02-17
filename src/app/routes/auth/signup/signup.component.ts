import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Location } from '@angular/common'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

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
  ) {
  }

  cancel() {
    this.location.back()
  }

  signup({ username, password }: { username: string, password: string }) {
    this.authService.signup(username, password)
      .subscribe(() => this.router.navigate(['/']))
  }
}
