import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Credentials } from 'src/app/models/credentials'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  form: FormGroup

  @Input() submitButtonText = ''
  @Output() cancel = new EventEmitter()
  @Output() formSubmit = new EventEmitter<Credentials>()

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    })
  }
}
