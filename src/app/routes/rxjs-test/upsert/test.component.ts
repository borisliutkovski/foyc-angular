import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-test-rx',
  template: `
    <app-test-2 *ngIf="switch"></app-test-2>

    <div *ngIf="switch" style="height: 20px; width: 20px; background-color: red"></div>

    <button type="button" (click)="ffswitch()">toggle</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
  switch = false

  ffswitch() {
    this.switch = !this.switch
  }
}
