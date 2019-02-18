import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Article } from 'src/app/models/article'
import { Router } from '@angular/router'
import { AuthService } from '../../auth/auth.service'
import { LocalNewsService } from '../local-news.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article!: Article

  constructor(
    private router: Router,
    public authService: AuthService,
    private localNewsService: LocalNewsService,
  ) { }

  deleteClick() {
    if (!this.article._id) {
      return
    }

    this.localNewsService.deleteArticle(this.article._id)
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article._id])
  }

  readMoreClick() {
    if (this.article._id) {
      this.router.navigate(['/', this.article._id])
    } else {
      window.open(this.article.url)
    }
  }
}
