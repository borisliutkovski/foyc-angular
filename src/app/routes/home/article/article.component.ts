import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Article } from 'src/app/models/article'
import { Router } from '@angular/router'

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
  ) { }

  deleteClick() {
    console.warn('delete')
  }

  editClick() {
    this.router.navigate(['article', 'edit', this.article.id])
  }

  readMoreClick() {
    this.router.navigate(['/', encodeURI(this.article.url)])
  }
}
