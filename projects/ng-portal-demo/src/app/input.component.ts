import { Component } from '@angular/core';
import { ngPortalInput } from 'projects/ng-portal/src/public-api';

@Component({
  selector: 'app-input',
  template: `<input (keyup)="value = $event.target.value">`,
})
export class InputComponent {
  @ngPortalInput() value: string;
}
