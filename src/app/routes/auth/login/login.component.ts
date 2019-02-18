import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Location } from '@angular/common'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Credentials } from 'src/app/models/credentials'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
  ) { }

  cancel() {
    this.location.back()
  }

  login(credentials: Credentials) {
    this.authService.login(credentials)
      .subscribe(() => this.router.navigate(['/']))
  }
}
