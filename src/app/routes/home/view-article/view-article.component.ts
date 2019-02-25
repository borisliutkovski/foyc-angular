import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Article } from 'src/app/models/article'
import { ILocalNewsService } from '../local-news/local-news.interface'
import { mergeMap } from 'rxjs/operators'

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
    localNewsService: ILocalNewsService,
    private router: Router,
    cdr: ChangeDetectorRef,
  ) {
    route.paramMap.pipe(mergeMap(paramMap => {
      const id = paramMap.get('id')
      if (!id) {
        throw new Error()
      }

      return localNewsService.getArticle(id)
    })).subscribe(article => {
      if (!article) {
        return
      }

      this.article = article
      cdr.markForCheck()
    })
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article._id])
  }

  deleteClick() {
    console.warn('delete')
  }
}
