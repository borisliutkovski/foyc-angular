import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AppService {
  private _pageTitle$ = new Subject<string>()
  pageTitle$ = this._pageTitle$.asObservable()

  setPageTitle(value: string) {
    this._pageTitle$.next(value)
  }
}
