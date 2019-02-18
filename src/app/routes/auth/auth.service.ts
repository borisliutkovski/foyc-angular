import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { tap, map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import { Credentials } from 'src/app/models/credentials'
import { User } from 'src/app/models/user'

@Injectable()
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | undefined>(undefined)
  currentUser$ = this._currentUser$.asObservable()
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user))
  token = ''

  constructor(
    private http: HttpClient,
  ) { }

  login(credentials: Credentials) {
    return this.http.post<{ payload: any, token: string }>(
      `${environment.apiUrl}/auth/login`,
      credentials,
    ).pipe(tap(({ token }) => {
      this.token = token
      const user: User = { username: credentials.username }
      this._currentUser$.next(user)
    }))
  }

  logout() {
    return this.http.post(
      `${environment.apiUrl}/auth/logout`,
      null,
      { headers: { Authorization: `Bearer ${this.token}` } },
    ).pipe(tap(() => {
      this._currentUser$.next(undefined)
      this.token = ''
    }))
  }

  signup(credentials: Credentials) {
    return this.http.post(
      `${environment.apiUrl}/auth/signup`,
      credentials,
    )
  }
}
