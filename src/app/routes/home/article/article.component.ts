import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core'
import { Article } from 'src/app/models/article'
import { Router } from '@angular/router'
import { AuthService } from '../../auth/auth.service'
import { ILocalNewsService } from '../local-news/local-news.interface'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article!: Article
  @Output() deleted = new EventEmitter()

  constructor(
    private router: Router,
    public authService: AuthService,
    private localNewsService: ILocalNewsService,
  ) { }

  deleteClick() {
    if (this.article._id == null) {
      return
    }

    this.localNewsService.deleteArticle(this.article._id).subscribe(() => {
      this.deleted.emit()
    })
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article._id])
  }

  readMoreClick() {
    if (this.article._id) {
      this.router.navigate(['/', 'view', this.article._id])
    } else {
      window.open(this.article.url)
    }
  }
}
