import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Article } from 'src/app/models/article'
import { Router } from '@angular/router'
import { AuthService } from '../../auth/auth.service'
import { map } from 'rxjs/operators'
import { LocalNewsService } from '../local-news.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article!: Article

  isLoggedIn = this.authService.currentUsername$.pipe(map(username => !!username))

  constructor(
    private router: Router,
    private authService: AuthService,
    private localNewsService: LocalNewsService,
  ) { }

  deleteClick() {
    if (!this.article.id) {
      return
    }

    this.localNewsService.deleteArticle(this.article.id)
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article.id])
  }

  readMoreClick() {
    if (this.article.id) {
      this.router.navigate(['/', this.article.id])
    } else {
      window.open(this.article.url)
    }
  }
}
