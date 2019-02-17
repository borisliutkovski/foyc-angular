import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Article } from 'src/app/models/article'
import { LocalNewsService } from '../local-news.service'

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewArticleComponent {
  article!: Article

  constructor(
    route: ActivatedRoute,
    localNewsService: LocalNewsService,
    private router: Router,
  ) {
    route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id')
      if (!id) {
        throw new Error()
      }

      localNewsService.getArticle(id)
        .subscribe(article => this.article = article)
    })
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article.id])
  }

  deleteClick() {
    console.warn('delete')
  }
}
