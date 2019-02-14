import { Component, ChangeDetectionStrategy } from '@angular/core'
import { HomeService } from '../home.service'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  form: FormGroup

  constructor(
    public homeService: HomeService,
  ) {
    this.form = new FormGroup({
      source: new FormControl(),
      keywords: new FormControl(),
      onlyByMe: new FormControl(),
    })
  }
}
