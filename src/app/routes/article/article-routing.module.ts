import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UpsertArticleComponent } from './upsert/upsert-article.component'

const routes: Routes = [
  { path: 'edit/:id', component: UpsertArticleComponent },
  { path: 'create', component: UpsertArticleComponent },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ArticleRoutingModule { }
