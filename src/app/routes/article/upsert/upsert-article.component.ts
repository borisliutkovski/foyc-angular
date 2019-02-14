import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NewsAPIService } from '../../home/newsapi.service'
import { Article } from 'src/app/models/article'
import { FormGroup, FormControl } from '@angular/forms'
import { Location } from '@angular/common'

enum ImageType {
  url,
  file,
}

@Component({
  selector: 'app-upsert-article',
  templateUrl: './upsert-article.component.html',
})
export class UpsertArticleComponent {
  isEdit = false
  editedId?: string
  form!: FormGroup

  ImageType = ImageType

  constructor(
    route: ActivatedRoute,
    private newsApiService: NewsAPIService,
    private location: Location,
  ) {
    route.paramMap.subscribe(paramMap => {
      this.editedId = paramMap.get('id') || undefined
      this.isEdit = !!this.editedId

      if (this.isEdit && this.editedId) {
        this.loadArticle(this.editedId)
      } else {
        this.createForm()
      }
    })
  }

  private loadArticle(id: string) {
    this.newsApiService.getArticleById(id)
      .subscribe(this.createForm)
  }

  private createForm(article?: Article) {
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
    alert(this.form.value)
  }
}
