import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/models/article'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class LocalNewsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getArticles() {
    return this.http.get<Article[]>(
      `${environment.apiUrl}/news`,
    )
  }

  getArticle(id: string) {
    return this.http.get<Article>(
      `${environment.apiUrl}/news/${id}`,
    )
  }

  createArticle(article: Article) {
    return this.http.post(
      `${environment.apiUrl}/news`,
      article,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }

  deleteArticle(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/news/${id}`,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }

  updateArticle(article: Article) {
    return this.http.put(
      `${environment.apiUrl}/news`,
      article,
      { headers: { Authorization: `Bearer ${this.authService.token}` } },
    )
  }
}
