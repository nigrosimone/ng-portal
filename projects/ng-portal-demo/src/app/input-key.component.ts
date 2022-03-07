import { Component } from '@angular/core';
import { ngPortalInput } from 'projects/ng-portal/src/public-api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input-key',
  template: `<input (keyup)="value = $any($event.target)?.value">`,
})
export class InputKeyComponent {
  @ngPortalInput({key: 'foo'}) value!: string;
}
