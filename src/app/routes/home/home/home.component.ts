import { Component, ChangeDetectionStrategy } from '@angular/core'
import { HomeService } from '../home.service'
import { AppService } from 'src/app/core/app.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    public homeService: HomeService,
    appService: AppService,
  ) {
    appService.setPageTitle('Top News')
  }
}
