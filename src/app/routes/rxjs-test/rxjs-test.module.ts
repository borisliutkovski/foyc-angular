import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RxjsTestRoutingModule } from './rxjs-test-routing.module'
import { Test2Component } from './upsert/test-2.component'
import { TestComponent } from './upsert/test.component'
import { LocalNewsService } from '../home/local-news/local-news.service'

@NgModule({
  imports: [
    CommonModule,
    RxjsTestRoutingModule,
  ],
  declarations: [
    Test2Component,
    TestComponent,
  ],
  providers: [
    LocalNewsService,
  ],
})
export class RxjsTestModule { }
