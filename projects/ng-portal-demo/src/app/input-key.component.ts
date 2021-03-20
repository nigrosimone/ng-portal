import { Component } from '@angular/core';
import { ngPortalInput } from 'projects/ng-portal/src/public-api';

@Component({
  selector: 'app-input-key',
  template: `<input (keyup)="value = $event.target.value">`,
})
export class InputKeyComponent {
  @ngPortalInput({key: 'foo'}) value: string;
}
