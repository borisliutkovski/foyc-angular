import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { HomeService } from './routes/home/home.service'
import { NewsAPIService } from './routes/home/newsapi.service'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { ILocalNewsService } from './routes/home/local-news/local-news.interface'
import { AuthModule } from './routes/auth/auth.module'
import { AuthService } from './routes/auth/auth.service'
import { environment } from '../environments/environment'
import { LocalNewsService } from './routes/home/local-news/local-news.service'
import { LocalNewsMockService } from './routes/home/local-news/local-news.mock'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    HomeService,
    NewsAPIService,
    {
      provide: ILocalNewsService,
      useFactory: (httpClient: HttpClient, authService: AuthService) => {
        return environment.production
          ? new LocalNewsService(httpClient, authService)
          : new LocalNewsMockService()
      },
      deps: [HttpClient, AuthService],
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
