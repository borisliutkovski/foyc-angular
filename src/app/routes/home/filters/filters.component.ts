import { Component } from '@angular/core'
import { HomeService } from '../home.service'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
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

  addArticleClick() {
    console.warn('add article')
  }
}
