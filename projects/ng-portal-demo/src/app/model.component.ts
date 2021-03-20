import { Component } from '@angular/core';
import { ngPortal } from 'projects/ng-portal/src/public-api';

@Component({
  selector: 'app-model',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelComponent {
  @ngPortal() model: any;
}
