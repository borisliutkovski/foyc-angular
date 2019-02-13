import { Component, Input } from '@angular/core'
import { Article } from 'src/app/models/article'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent {
  @Input() article: Article
}
