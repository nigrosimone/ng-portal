import { Component } from '@angular/core';
import { ngPortal } from 'projects/ng-portal/src/public-api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-model',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ngPortal() model: any;
}
