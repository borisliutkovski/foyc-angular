import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/models/article'
import { AuthService } from '../../auth/auth.service'
import { ILocalNewsService } from './local-news.interface'

@Injectable()
export class LocalNewsService extends ILocalNewsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    super()
  }

  getArticles() {
    return this.http.get<Article[]>(
      `${environment.apiUrl}/news`,
    )
  }

  getTest() {
    return this.http.get<Article[]>(
      `${environment.apiUrl}/news/rxjs`,
    )
  }

  getArticle(id: string) {
    return this.http.get<Article | undefined>(
      `${environment.apiUrl}/news/${id}`,
    )
  }

  createArticle(article: Article) {
    return this.http.post<string>(
      `${environment.apiUrl}/news`,
      article,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }

  deleteArticle(id: string) {
    return this.http.delete<void>(
      `${environment.apiUrl}/news/${id}`,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }

  updateArticle(article: Article) {
    return this.http.put<void>(
      `${environment.apiUrl}/news`,
      article,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }
}
