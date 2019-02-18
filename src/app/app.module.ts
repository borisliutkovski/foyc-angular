import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { HomeService } from './routes/home/home.service'
import { NewsAPIService } from './routes/home/newsapi.service'
import { HttpClientModule } from '@angular/common/http'
import { LocalNewsService } from './routes/home/local-news.service'
import { AuthModule } from './routes/auth/auth.module'
import { AuthService } from './routes/auth/auth.service'

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
    LocalNewsService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
