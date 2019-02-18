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
  private _sources$ = new BehaviorSubject<Source[]>([])
  sources$ = this._sources$.asObservable()
  private _articles$ = new BehaviorSubject<Article[]>([])
  articles$ = this._articles$.asObservable()
  private _currentFilter$ = new BehaviorSubject<Filter | undefined>(undefined)
  currentFilter$ = this._currentFilter$.asObservable()
  private page = 1

  constructor(
    private newsApiService: NewsAPIService,
    private appService: AppService,
    private localNewsService: LocalNewsService,
  ) {
    newsApiService.getSources()
      .subscribe(sources => {
        this._sources$.next(sources.sources)
      })

    newsApiService.getTopArticles(this.page)
      .subscribe(articles => {
        this._articles$.next(articles.articles)
      })
  }

  loadMoreArticles() {
    this.page++
    this.newsApiService.getTopArticles(this.page)
      .subscribe(articles => {
        this._articles$.next(this._articles$.value.concat(articles.articles))
      })
  }

  loadFromParams(filter: Filter) {
    this._currentFilter$.next(filter)
    if (!filter.local) {
      const getArticlesObservable = (filter.keywords || filter.source)
        ? this.newsApiService.getArticles(filter)
        : this.newsApiService.getTopArticles()

      getArticlesObservable
        .subscribe(articles => {
          this._articles$.next(articles.articles)
          if (filter.source) {
            this.appService.setPageTitle(filter.source.name)
          }
        })
    } else {
      this.localNewsService.getArticles()
        .subscribe(articles => {
          this._articles$.next(articles)
          this.appService.setPageTitle('Local news')
        })
    }
  }
}
