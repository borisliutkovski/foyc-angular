import { Component } from '@angular/core'
import { UserService } from '../core/user.service'
import { AppService } from '../core/app.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    public appService: AppService,
  ) { }
}
