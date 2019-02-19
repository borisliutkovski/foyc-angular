// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing'
import { getTestBed, tick } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'
import { Observable } from 'rxjs'

declare const require: any

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
)
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/)
// And load the modules.
context.keys().map(context)

export const customMatchers = {
  toEmit() {
    return {
      compare(actual: Observable<any>, expected: any, callToTrigger: () => void) {
        const result: any = {}

        const spyFn = jasmine.createSpy()

        actual.subscribe((value: any) => {
          result.pass = value === expected
          spyFn()
        })

        callToTrigger()

        tick()

        if (!spyFn.calls.any()) {
          result.message = 'Did not emit'
        } else if (!result.pass) {
          result.message = 'Value did not equal'
        }

        result.pass = result.pass && spyFn.calls.any()

        return result
      },
    }
  },
}
