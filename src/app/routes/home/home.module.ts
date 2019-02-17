import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home/home.component'
import { FiltersComponent } from './filters/filters.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ArticleComponent } from './article/article.component'
import { ViewArticleComponent } from './view-article/view-article.component'

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    FiltersComponent,
    ArticleComponent,
    ViewArticleComponent,
  ],
  providers: [
  ],
})
export class HomeModule { }
