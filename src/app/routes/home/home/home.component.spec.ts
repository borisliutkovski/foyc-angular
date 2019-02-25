import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import { HomeComponent } from './home.component'
import { HomeService } from '../home.service'
import { AppService } from 'src/app/core/app.service'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let homeServiceMock: jasmine.SpyObj<HomeService>
  let appServiceMock: jasmine.SpyObj<AppService>

  beforeEach(async(() => {
    homeServiceMock = jasmine.createSpyObj('HomeService', ['f'])
    appServiceMock = jasmine.createSpyObj('AppService', ['setPageTitle'])

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HomeService, useValue: homeServiceMock },
        { provide: AppService, useValue: appServiceMock },
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set page title', () => {
    expect(appServiceMock.setPageTitle).toHaveBeenCalledWith('Top News')
  })
})
