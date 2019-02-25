import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: './routes/home/home.module#HomeModule' },
  { path: 'rxjs', loadChildren: './routes/rxjs-test/rxjs-test.module#RxjsTestModule' },
  { path: 'article', loadChildren: './routes/article/article.module#ArticleModule' },
  { path: 'auth', loadChildren: './routes/auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
