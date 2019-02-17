import { Injectable } from '@angular/core'
import { Source } from 'src/app/models/source'
import { BehaviorSubject } from 'rxjs'
import { Article } from 'src/app/models/article'
import { Filter } from 'src/app/models/filter'
import { NewsAPIService } from './newsapi.service'
import { AppService } from 'src/app/core/app.service'
import { LocalNewsService } from './local-news.service'

@Injectable()
export class HomeService {
  sources$ = new BehaviorSubject<Source[]>([])
  articles$ = new BehaviorSubject<Article[]>([])
  currentFilter$ = new BehaviorSubject<Filter | undefined>(undefined)
  private page = 1

  constructor(
    private newsApiService: NewsAPIService,
    private appService: AppService,
    private localNewsService: LocalNewsService,
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

  loadFromParams(filter: Filter) {
    if (!filter.local) {

      this.newsApiService.getArticles(filter)
        .subscribe(articles => {
          this.articles$.next(articles.articles)
          if (filter.source) {
            this.appService.setPageTitle(filter.source.name)
          }
        })
    } else {
      this.localNewsService.getArticles()
        .subscribe(articles => {
          this.articles$.next(articles)
          this.appService.setPageTitle('Local news')
        })
    }
  }
}
