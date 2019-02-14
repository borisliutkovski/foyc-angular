import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ViewArticleComponent } from './view-article/view-article.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':url', component: ViewArticleComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
