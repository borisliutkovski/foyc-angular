import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Article } from 'src/app/models/article'
import { ILocalNewsService } from '../local-news/local-news.interface'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { DestroyableComponent } from 'src/app/core/util/destroyable.component'

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewArticleComponent extends DestroyableComponent {
  article!: Article

  constructor(
    route: ActivatedRoute,
    private localNewsService: ILocalNewsService,
    private router: Router,
    cdr: ChangeDetectorRef,
  ) {
    super()
    route.paramMap.pipe(
      takeUntil(this.onDestory),
      mergeMap(paramMap => {
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
    if (!this.article._id) {
      return
    }

    this.localNewsService.deleteArticle(this.article._id)
      .subscribe(() => this.router.navigate(['/']))
  }
}
