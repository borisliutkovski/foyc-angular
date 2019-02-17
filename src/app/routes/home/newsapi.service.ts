import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Source } from 'src/app/models/source'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/models/article'
import { Filter } from 'src/app/models/filter'

interface NewsApiResponse {
  status: string,
  totalResults: number,
}

interface SourcesResponse extends NewsApiResponse {
  sources: Source[],
}

interface ArticlesResponse extends NewsApiResponse {
  articles: Article[],
}

@Injectable()
export class NewsAPIService {
  constructor(
    private http: HttpClient,
  ) { }

  getSources() {
    return this.http.get<SourcesResponse>(`https://newsapi.org/v2/sources?apiKey=${environment.newsApiKey}`)
  }

  getTopArticles(page: number = 1) {
    return this.http.get<ArticlesResponse>(
      `https://newsapi.org/v2/top-headlines` +
      `?language=en` +
      `&pageSize=10` +
      `&page=${page}` +
      `&apiKey=${environment.newsApiKey}`,
    )
  }

  getArticles(filter: Filter) {
    return this.http.get<ArticlesResponse>(
      `https://newsapi.org/v2/everything` +
      `?apiKey=${environment.newsApiKey}` +
      (filter.keywords ? `&q=${filter.keywords.split(' ').join(',')}` : '') +
      (filter.source ? `&sources=${filter.source}` : ''),
    )
  }

  getArticleById(id: string) {
    return this.http.get<Article>(
      `${environment.apiUrl}/news/${id}`,
    )
  }
}
