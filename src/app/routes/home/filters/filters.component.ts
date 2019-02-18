import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core'
import { HomeService } from '../home.service'
import { FormControl, FormGroup } from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Filter } from 'src/app/models/filter'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnDestroy {
  form: FormGroup

  private onDestroy = new Subject()

  constructor(
    public homeService: HomeService,
    public authService: AuthService,
  ) {
    this.form = new FormGroup({
      source: new FormControl(null),
      keywords: new FormControl(),
      onlyByMe: new FormControl(false),
      local: new FormControl(false),
    })

    this.form.valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(form => {
        const filter: Filter = {
          keywords: form.keywords,
          onlyByMe: form.onlyByMe,
          source: form.source,
          local: form.local,
        }

        this.homeService.loadFromParams(filter)
      })
  }

  ngOnDestroy() {
    this.onDestroy.next()
    this.onDestroy.complete()
  }
}
