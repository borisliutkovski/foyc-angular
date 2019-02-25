import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AppService } from '../core/app.service'
import { AuthService } from '../routes/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public appService: AppService,
    private router: Router,
  ) { }

  async logout() {
    await this.authService.logout().subscribe()
    this.router.navigate(['/'])
  }

  login() {
    this.router.navigate(['/', 'auth', 'login'])
  }

  signup() {
    this.router.navigate(['/', 'auth', 'signup'])
  }
}
