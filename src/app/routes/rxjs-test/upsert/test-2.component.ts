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

// import { Component } from '@angular/core'
// import { LocalNewsService } from '../../home/local-news/local-news.service'

// @Component({
//   selector: 'app-test-2',
//   template: ``,
// })
// export class Test2Component {
//   constructor(private localN: LocalNewsService) {
//     // set production to true in env.ts

//     for (let i = 0; i < 10000; i++) {
//       // creating a gazillion subscriptions
//       // once the component is destroyed by an ngIf, memory should free up
//       localN.getTest().toPromise()
//     }
//   }
// }

// import { Component, OnDestroy } from '@angular/core'
// import { LocalNewsService } from '../../home/local-news/local-news.service'
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-test-2',
//   template: ``,
// })
// export class Test2Component implements OnDestroy {
//   private subs: Subscription[] = []
//   constructor(private localN: LocalNewsService) {
//     // set production to true in env.ts

//     for (let i = 0; i < 10000; i++) {
//       // creating a gazillion subscriptions
//       // once the component is destroyed by an ngIf, memory should free up
//       this.subs.push(localN.getTest().subscribe())
//     }
//   }

//   ngOnDestroy() {
//     for (let sub of this.subs) {
//       sub.unsubscribe()
//     }
//   }
// }
