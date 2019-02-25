import { Observable } from 'rxjs'
import { Article } from 'src/app/models/article'

export abstract class ILocalNewsService {
  abstract getArticles(): Observable<Article[]>
  abstract getArticle(id: string): Observable<Article | undefined>
  abstract createArticle(article: Article): Observable<string>
  abstract deleteArticle(id: string): Observable<void>
  abstract updateArticle(article: Article): Observable<void>
}
