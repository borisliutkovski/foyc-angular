import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class AuthService {
  currentUsername$ = new BehaviorSubject('')
  token = ''

  constructor(
    private http: HttpClient,
  ) { }


  login(username: string, password: string) {
    return this.http.post<string>(
      `${environment.apiUrl}/login`,
      { username, password },
    ).pipe(tap(token => {
      this.token = token
      this.currentUsername$.next(username)
    }))
  }

  logout() {
    return this.http.post(
      `${environment.apiUrl}/logout`,
      null,
      { headers: { Authorization: `Bearer ${this.token}` } },
    ).pipe(tap(() => {
      this.currentUsername$.next('')
      this.token = ''
    }))
  }

  signup(username: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/signup`,
      { username, password },
    )
  }
}
