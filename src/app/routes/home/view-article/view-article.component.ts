import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HomeService } from '../home.service'
import { Article } from 'src/app/models/article'

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
})
export class ViewArticleComponent {
  article!: Article

  constructor(
    route: ActivatedRoute,
    homeService: HomeService,
    private router: Router,
  ) {
    route.paramMap.subscribe(paramMap => {
      const articleUrl = paramMap.get('url')
      homeService.articles$.subscribe(articles => {
        const article = articles.find(({ url }) => url === articleUrl)
        if (article) {
          this.article = article
        }
      })
    })
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article.id])
  }

  deleteClick() {
    console.warn('delete')
  }
}
