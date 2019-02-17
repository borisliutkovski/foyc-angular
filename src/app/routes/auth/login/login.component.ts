import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Location } from '@angular/common'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  cancel() {
    this.location.back()
  }

  login({ username, password }: { username: string, password: string }) {
    this.authService.login(username, password)
      .subscribe(() => this.router.navigate(['/']))
  }
}
