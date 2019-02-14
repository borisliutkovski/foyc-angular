import { Injectable } from '@angular/core'
import { Source } from 'src/app/models/source'
import { Subject, BehaviorSubject } from 'rxjs'
import { Article } from 'src/app/models/article'
import { Filter } from 'src/app/models/filter'
import { NewsAPIService } from './newsapi.service'

@Injectable()
export class HomeService {
  sources$ = new Subject<Source[]>()
  articles$ = new BehaviorSubject<Article[]>([])
  currentFilter$ = new Subject<Filter | undefined>()
  private page = 1

  constructor(
    private newsApiService: NewsAPIService,
  ) {
    newsApiService.getSources()
      .subscribe(sources => {
        this.sources$.next(sources.sources)
      })

    newsApiService.getTopArticles(this.page)
      .subscribe(articles => {
        this.articles$.next(articles.articles)
      })
  }

  loadMoreArticles() {
    this.page++
    this.newsApiService.getTopArticles(this.page)
      .subscribe(articles => {
        this.articles$.next(this.articles$.value.concat(articles.articles))
      })
  }
}
