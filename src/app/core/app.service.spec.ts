import { AppService } from 'src/app/core/app.service'
import { fakeAsync } from '@angular/core/testing'
import { customMatchers } from 'src/test'

describe('AppService', () => {
  let service: AppService

  beforeEach(() => {
    service = new AppService()
    jasmine.addMatchers(customMatchers)
  })

  it('should create', () => {
    expect(service).toBeTruthy()
  })

  it('should emit when setting page title', fakeAsync(() => {
    const setTitle = 'asdf'

    expect(service.pageTitle$).toEmit(setTitle, () => service.setPageTitle(setTitle))
  }))
})
