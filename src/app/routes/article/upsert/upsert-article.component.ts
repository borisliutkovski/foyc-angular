import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Article } from 'src/app/models/article'
import { FormGroup, FormControl } from '@angular/forms'
import { Location } from '@angular/common'
import { AppService } from 'src/app/core/app.service'
import { ILocalNewsService } from '../../home/local-news/local-news.interface'

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
export class UpsertArticleComponent {
  isEdit = false
  editedId?: string
  form!: FormGroup
  private article?: Article

  ImageType = ImageType

  constructor(
    route: ActivatedRoute,
    private location: Location,
    appService: AppService,
    private localNewsService: ILocalNewsService,
    private cdr: ChangeDetectorRef,
  ) {
    route.paramMap.subscribe(paramMap => {
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
      title: new FormControl(article ? article.title : ''),
      description: new FormControl(article ? article.description : ''),
      url: new FormControl(article ? article.url : ''),
      urlToImage: new FormControl(article ? article.urlToImage : ''),
      imageFile: new FormControl(),
      imageType: new FormControl(),
      publishedAt: new FormControl(article ? article.publishedAt : ''),
      content: new FormControl(article ? article.content : ''),
    })
  }

  onBack() {
    this.location.back()
  }

  onSubmit() {
    if (this.isEdit && this.article) {
      const article = {
        ...this.form.value,
        _id: this.article._id,
      }

      this.localNewsService.updateArticle(article).subscribe()
    }
    this.localNewsService.createArticle(this.form.value).subscribe()
  }
}
