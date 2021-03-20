import { Component } from '@angular/core';
import { ngPortal } from 'projects/ng-portal/src/public-api';

@Component({
  selector: 'app-model-key',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelKeyComponent {
  @ngPortal({key: 'bar'}) model: any;
}
