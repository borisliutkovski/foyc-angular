import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Article } from 'src/app/models/article'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/core/app.service'
import { ILocalNewsService } from '../../home/local-news/local-news.interface'
import { map } from 'rxjs/internal/operators/map'
import { DestroyableComponent } from 'src/app/core/util/destroyable.component'
import { takeUntil } from 'rxjs/operators'

enum ImageType {
  url,
  file,
}

@Component({
  selector: 'app-upsert-article',
  templateUrl: './upsert-article.component.html',
  styleUrls: ['./upsert-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertArticleComponent extends DestroyableComponent {
  isEdit = false
  editedId?: string
  form = new FormGroup({})
  private article?: Article

  ImageType = ImageType

  constructor(
    route: ActivatedRoute,
    appService: AppService,
    private localNewsService: ILocalNewsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    super()

    route.paramMap
      .pipe(takeUntil(this.onDestroy))
      .subscribe(paramMap => {
        this.editedId = paramMap.get('id') || undefined
        this.isEdit = !!this.editedId
        appService.setPageTitle(this.isEdit ? 'Edit' : 'Create')

        if (this.isEdit && this.editedId) {
          this.loadArticle(this.editedId)
        } else {
          this.createForm()
        }
      })
  }

  private loadArticle(id: string) {
    this.localNewsService.getArticle(id)
      .subscribe(article => {
        this.createForm(article)
        this.article = article
        this.cdr.markForCheck()
      })
  }

  private createForm = (article?: Article) => {
    this.form = new FormGroup({
      author: new FormControl(article ? article.author : ''),
      title: new FormControl(article ? article.title : '', Validators.required),
      description: new FormControl(article ? article.description : '', Validators.required),
      url: new FormControl(article ? article.url : ''),
      urlToImage: new FormControl(article ? article.urlToImage : ''),
      imageFile: new FormControl(),
      imageType: new FormControl(),
      publishedAt: new FormControl(article ? article.publishedAt : ''),
      content: new FormControl(article ? article.content : '', Validators.required),
    })
  }

  onBack() {
    this.router.navigate(['/'])
  }

  onSubmit() {
    this.createOrUpdateArticle()
      .subscribe(() => this.router.navigate(['/']))
  }

  private createOrUpdateArticle() {
    if (this.isEdit && this.article) {
      const article = {
        ...this.form.value,
        _id: this.article._id,
      }

      return this.localNewsService.updateArticle(article)
    }

    return this.localNewsService.createArticle(this.form.value).pipe(map(() => { }))
  }
}
