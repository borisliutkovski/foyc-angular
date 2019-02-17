import { NgModule } from '@angular/core'
import { ArticleRoutingModule } from './article-routing.module'
import { CommonModule } from '@angular/common'
import { UpsertArticleComponent } from './upsert/upsert-article.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UpsertArticleComponent,
  ],
})
export class ArticleModule { }
