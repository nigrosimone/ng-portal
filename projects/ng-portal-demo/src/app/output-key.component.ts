import { Component } from '@angular/core';
import { ngPortalOutput } from 'projects/ng-portal/src/public-api';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-output-key',
  template: `<input [value]="value | async" readonly disabled>`,
})
export class OutputKeyComponent {
  @ngPortalOutput({key: 'foo'}) value!: Observable<string>;
}
