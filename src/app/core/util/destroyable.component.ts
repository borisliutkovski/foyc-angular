import { OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

export class DestroyableComponent implements OnDestroy {
  private _onDestroy = new Subject()
  protected onDestory = this._onDestroy.asObservable()

  ngOnDestroy() {
    this._onDestroy.next()
    this._onDestroy.complete()
  }
}
