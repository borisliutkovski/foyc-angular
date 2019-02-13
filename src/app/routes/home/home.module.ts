import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home/home.component'
import { FiltersComponent } from './filters/filters.component'
import { HomeService } from './home.service'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ArticleComponent } from './article/article.component'
import { HttpClientModule } from '@angular/common/http'
import { NewsAPIService } from './newsapi.service'

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    HomeComponent,
    FiltersComponent,
    ArticleComponent,
  ],
  providers: [
    HomeService,
    NewsAPIService,
  ],
})
export class HomeModule { }
