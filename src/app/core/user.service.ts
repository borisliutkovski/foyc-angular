import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { User } from '../models/user'

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser$ = new Subject<User | undefined>()
  logout() {
    console.warn('logout')
    this.currentUser$.next(undefined)
  }

  login() {
    console.warn('login')
    this.currentUser$.next({username: 'Firstname Lastname'})
  }
}
