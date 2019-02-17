import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NewsAPIService } from '../../home/newsapi.service'
import { Article } from 'src/app/models/article'
import { FormGroup, FormControl } from '@angular/forms'
import { Location } from '@angular/common'
import { HomeService } from '../../home/home.service';
import { AppService } from 'src/app/core/app.service';

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

  ImageType = ImageType

  constructor(
    route: ActivatedRoute,
    private homeService: HomeService,
    private location: Location,
    appService: AppService,
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

  private loadArticle(loadedUrl: string) {
    this.homeService.articles$.subscribe(articles => {
      const article = articles.find(({ url }) => url === loadedUrl)
      this.createForm(article)
    })
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
