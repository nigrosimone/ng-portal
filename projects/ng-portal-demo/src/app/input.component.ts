import { Component } from '@angular/core';
import { ngPortalInput } from 'projects/ng-portal/src/public-api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input',
  template: `<input (keyup)="value = $any($event.target)?.value">`,
})
export class InputComponent {
  @ngPortalInput()
  value!: string;
}
