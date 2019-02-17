import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-user-form',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  form: FormGroup

  @Input() submitButtonText = ''
  @Output() cancel = new EventEmitter()
  @Output() submit = new EventEmitter<{ username: string, password: string }>()

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    })
  }
}
