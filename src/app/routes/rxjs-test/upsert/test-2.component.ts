import { Component } from '@angular/core'
import { LocalNewsService } from '../../home/local-news/local-news.service'

@Component({
  selector: 'app-test-2',
  template: ``,
})
export class Test2Component {
  constructor(private localN: LocalNewsService) {
    // set production to true in env.ts

    for (let i = 0; i < 10000; i++) {
      localN.getTest().subscribe()
    }
  }
}
