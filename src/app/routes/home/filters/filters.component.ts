import { Component, ChangeDetectionStrategy } from '@angular/core'
import { HomeService } from '../home.service'
import { FormControl, FormGroup } from '@angular/forms'
import { takeUntil, debounceTime } from 'rxjs/operators'
import { Filter } from 'src/app/models/filter'
import { AuthService } from '../../auth/auth.service'
import { DestroyableComponent } from 'src/app/core/util/destroyable.component'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent extends DestroyableComponent {
  form: FormGroup

  constructor(
    public homeService: HomeService,
    public authService: AuthService,
  ) {
    super()

    this.form = new FormGroup({
      source: new FormControl(null),
      keywords: new FormControl(),
      onlyByMe: new FormControl(false),
      local: new FormControl(false),
    })

    homeService.currentFilter$.subscribe(filter => {
      this.form.setValue({
        source: filter ? filter.source : null,
        keywords: filter ? filter.keywords : '',
        onlyByMe: filter ? filter.onlyByMe : false,
        local: filter ? filter.local : false,
      })
    })

    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy),
      debounceTime(200),
    )
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
}
