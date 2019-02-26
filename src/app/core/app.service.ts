import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AppService {
  private _pageTitle$ = new BehaviorSubject<string>('FOYC')
  pageTitle$ = this._pageTitle$.asObservable()

  setPageTitle(value: string) {
    this._pageTitle$.next(value)
  }
}
