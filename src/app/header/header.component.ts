import { Component, ChangeDetectionStrategy } from '@angular/core'
import { UserService } from '../core/user.service'
import { AppService } from '../core/app.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    public appService: AppService,
  ) { }
}
