import { Injectable } from '@angular/core'
import { Article } from 'src/app/models/article'
import { ILocalNewsService } from './local-news.interface'
import { of } from 'rxjs'

@Injectable()
export class LocalNewsMockService extends ILocalNewsService {

  private articles: Article[] = []
  private currentId = 0

  getArticles() {
    return of(this.articles)
  }

  getArticle(id: string) {
    return of(this.articles.find(({ _id }) => _id === id))
  }

  createArticle(article: Article) {
    this.articles.push({
      ...article,
      _id: '' + this.currentId++,
    })

    return of('' + this.currentId)
  }

  deleteArticle(id: string) {
    this.articles = this.articles.filter(({ _id }) => id !== _id)
    return of<void>(undefined)
  }

  updateArticle(newArticle: Article) {
    this.articles = this.articles.map(iterArticle => newArticle._id === iterArticle._id ? newArticle : iterArticle)

    return of<void>(undefined)
  }
}
