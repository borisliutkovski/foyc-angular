import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Source } from 'src/app/models/source'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/models/article'

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
  constructor(private http: HttpClient) { }

  getSources() {
    return this.http.get<SourcesResponse>(`https://newsapi.org/v2/sources?apiKey=${environment.newsApiKey}`)
  }

  getTopArticles() {
    return this.http.get<ArticlesResponse>(
      `https://newsapi.org/v2/top-headlines?language=en&apiKey=${environment.newsApiKey}`,
    )
  }
}
