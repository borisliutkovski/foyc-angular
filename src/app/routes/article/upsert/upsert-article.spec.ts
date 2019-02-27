import { UpsertArticleComponent } from './upsert-article.component'
import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing'
import { ActivatedRoute, Router, convertToParamMap, ParamMap } from '@angular/router'
import { AppService } from 'src/app/core/app.service'
import { ILocalNewsService } from '../../home/local-news/local-news.interface'
import { ReactiveFormsModule } from '@angular/forms'
import { Subject, of } from 'rxjs'
import { By } from '@angular/platform-browser'

describe('UpsertArticleComponent -', () => {
  let component: UpsertArticleComponent
  let fixture: ComponentFixture<UpsertArticleComponent>
  let activatedRouteMock: any
  let paramMapSubject: Subject<ParamMap>
  let appServiceMock: any
  let localNewsServiceMock: any
  let routerMock: any

  beforeEach(() => {
    paramMapSubject = new Subject()
    activatedRouteMock = { paramMap: paramMapSubject }
    appServiceMock = jasmine.createSpyObj('AppService', ['setPageTitle'])
    localNewsServiceMock = jasmine.createSpyObj('ILocalNewsService', ['getArticle', 'updateArticle', 'createArticle'])
    localNewsServiceMock.createArticle.and.returnValue(of(undefined))
    routerMock = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [UpsertArticleComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AppService, useValue: appServiceMock },
        { provide: ILocalNewsService, useValue: localNewsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [ReactiveFormsModule],
    })

    fixture = TestBed.createComponent(UpsertArticleComponent)
    component = fixture.componentInstance
  })

  it('compiles', () => {
    expect(component).toBeDefined()
  })

  describe('when creating -', () => {
    beforeEach(fakeAsync(() => {
      paramMapSubject.next(convertToParamMap({}))
      tick()
    }))

    it('initializes correctly when no id in param map', () => {
      expect(component.isEdit).toBe(false)
      expect(component.editedId).toBeUndefined()
      expect(component.form).toBeDefined()
      expect(Object.values(component.form.controls).some(control => !!control.value)).toBe(false)

      const titleInput = fixture.debugElement.query(By.css('#title')).nativeElement
      expect(titleInput.value).toBeFalsy()
    })

    it('calls createArticle when submitting', fakeAsync(() => {
      const controls = component.form.controls
      controls.title.setValue('title')
      controls.description.setValue('description')
      controls.content.setValue('content')

      fixture.detectChanges()

      expect(component.form.valid).toBe(true)

      component.onSubmit()

      expect(localNewsServiceMock.updateArticle).not.toHaveBeenCalled()
      expect(localNewsServiceMock.createArticle).toHaveBeenCalled()

      tick()

      expect(routerMock.navigate).toHaveBeenCalled()
    }))
  })
})
