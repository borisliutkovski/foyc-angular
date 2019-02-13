import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AppService {
  pageTitle$ = new Subject<string>()

  setPageTitle(value: string) {
    this.pageTitle$.next(value)
  }
}
