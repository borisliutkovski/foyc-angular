import { NgModule } from '@angular/core'
import { ArticleRoutingModule } from './article-routing.module'
import { CommonModule } from '@angular/common'
import { UpsertArticleComponent } from './upsert/upsert-article.component'

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
  ],
  declarations: [
    UpsertArticleComponent,
  ],
})
export class ArticleModule { }
