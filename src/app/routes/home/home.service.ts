import { Injectable } from '@angular/core'
import { Source } from 'src/app/models/source'
import { Subject } from 'rxjs'
import { Article } from 'src/app/models/article'
import { Filter } from 'src/app/models/filter'
import { NewsAPIService } from './newsapi.service';

@Injectable()
export class HomeService {
  sources$ = new Subject<Source[]>()
  articles$ = new Subject<Article[]>()
  currentFilter$ = new Subject<Filter | undefined>()

  constructor(
    private newsApiService: NewsAPIService,
  ) {
    newsApiService.getSources()
      .subscribe(sources => {
        this.sources$.next(sources.sources)
      })

    newsApiService.getTopArticles()
      .subscribe(articles => {
        this.articles$.next(articles.articles)
      })
  }
}
