import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
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

  getTopArticles(page: number = 1) {
    return this.http.get<ArticlesResponse>(
      `https://newsapi.org/v2/top-headlines` +
      `?language=en` +
      `&pageSize=10` +
      `&page=${page}` +
      `&apiKey=${environment.newsApiKey}`,
    )
  }

  getArticleById(id: string) {
    // supposed to be my api
    const article: Article = {
      author: 'author',
      content: 'content',
      description: 'description',
      id: '234985yiuao4',
      publishedAt: new Date(),
      source: {
        id: 'asdf',
        name: 'asdfasd',
      },
      title: 'Title',
      url: 'asdfsfad',
      urlToImage: 'asdfasdf',
    }

    return of(article)
  }
}
