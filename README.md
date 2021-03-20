# NgPortal [![Build Status](https://travis-ci.org/nigrosimone/ng-portal.svg?branch=master)](https://travis-ci.com/github/nigrosimone/ng-portal) [![Coverage Status](https://coveralls.io/repos/github/nigrosimone/ng-portal/badge.svg?branch=master)](https://coveralls.io/github/nigrosimone/ng-portal?branch=master) [![NPM version](https://img.shields.io/npm/v/ng-portal.svg)](https://www.npmjs.com/package/ng-portal)

Component property connection in Angular application.

## Description

Sometime there is a need to send data beetween components. A common pattern in Angular is sharing data between a parent component and one or more child components by using the `@Input()` and `@Output()` directives.
This pattern works if component in the same scope. 
In this example an _output component_ set a property `value` imputed by _input component_, eg:

```html
<app-output (value)="value = $event"><app-output>
<app-input [value]="value"></app-input>
```

But what happen if both component arent in the same scope? A common pattern in this case is propagate `@Input()` and `@Output()` throught the tree of parents/childs component or write a shared service for exhange the data.

`NgPortal` offer a dead simple solution, a new directive `@NgPortal()` that connect two property wherever they are.

In this example every property called `model` with `@NgPortal()` directive is connected and every changes is propagated wherever, eg.:

```ts
import { Component } from '@angular/core';
import { ngPortal } from 'ng-portal';

@Component({
  selector: 'app-model',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelComponent {
  @ngPortal() model: any;
}
```

There are also mono-direction directive `@NgPortalInput()` and `@NgPortalOutput()` for more control.


See the [stackblitz demo](https://stackblitz.com/edit/demo-ng-portal?file=src%2Fapp%2Fapp.component.ts).

## Features

✅ Two way data binging<br>
✅ Mono directinal communicazion<br>
✅ Async pipe support<br>
✅ NgModel support<br>

## Get Started

*Step 1*: install `ng-portal`

```bash
npm i ng-portal
```

*Step 2*: Import `NgPortalModule` into your app module, eg.:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NgPortalModule } from 'ng-portal';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgPortalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  ],
})
export class AppModule { }
```

## API

Available propery decorators (optional):

 - `@ngPortal(options?: NgPortalDecoratorOptions)`: two way communication
 - `@ngPortalInput(options?: NgPortalDecoratorOptions)`: only send changes 
 - `@ngPortalOutput(options?: NgPortalDecoratorOptions)`: only receive changes 

Decorator options interface:

```ts
export interface NgPortalDecoratorOptions {
  key: string;
}
```

From default `ngPortal` use property name as the key:

```ts
@ngPortal() value: string;
```

is equivalent to:

```ts
@ngPortal({key: 'value'}) value: string;
```

and is also equivalent to:

```ts
@ngPortal({key: 'value'}) whateverYouWant: string;
```

## Examples

Below there are some examples of use case.

### Example: input / output components connected by property name

`InputComponent` has property `value` with `@ngPortalInput()` decorator that on change update property `value` into `OutputComponent` with `@ngPortalOutput()`, eg.:

```ts
import { Component } from '@angular/core';
import { ngPortalInput, ngPortalOutput } from 'ng-portal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input',
  template: `<input (keyup)="value = $event.target.value">`,
})
export class InputComponent {
  @ngPortalInput() value: string;
}

@Component({
  selector: 'app-output',
  template: `<input [value]="value | async" readonly disabled>`,
})
export class OutputComponent {
  @ngPortalOutput() value: Observable<string>;
}
```

### Example: input / output components connected by key

`InputComponent` has property `inputValue` with `@ngPortalInput({key: 'foo'})` decorator that on change update property `outputValue` into `OutputComponent` with `@ngPortalOutput({key: 'foo'})`. In this case is the key 'foo' that made the connection, eg.:

```ts
import { Component } from '@angular/core';
import { ngPortalInput, ngPortalOutput } from 'ng-portal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input',
  template: `<input (keyup)="inputValue = $event.target.value">`,
})
export class InputComponent {
  @ngPortalInput({key: 'foo'}) inputValue: string;
}

@Component({
  selector: 'app-output',
  template: `<input [value]="outputValue | async" readonly disabled>`,
})
export class OutputComponent {
  @ngPortalOutput({key: 'foo'}) outputValue: Observable<string>;
}
```

### Example: NgModel connection by property name

`ModelComponent` has property `model` with `@ngPortal()` decorator that on change update property `model` in every components with same property and `@ngPortal()` or `@ngPortalOutput()` decorators. eg.:

```ts
import { Component } from '@angular/core';
import { ngPortal } from 'ng-portal';

@Component({
  selector: 'app-model',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelComponent {
  @ngPortal() model: any;
}
```

### Example: NgModel connection connected by key

`ModelComponent` has property `model` with `@ngPortal({key: 'foo'})` decorator that on change update every property in every components with `@ngPortal({key: 'foo'})` or `@ngPortalOutput({key: 'foo'})` decorators. eg.:

```ts
import { Component } from '@angular/core';
import { ngPortal, ngPortalOutput } from 'ng-portal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-model',
  template: `<input [ngModel]="model | async" (ngModelChange)="model = $event">`,
})
export class ModelComponent {
  @ngPortal({key: 'foo'}) model: any;
}

@Component({
  selector: 'app-output',
  template: `<input [value]="outputValue | async" readonly disabled>`,
})
export class OutputComponent {
  @ngPortalOutput({key: 'foo'}) outputValue: Observable<string>;
}
```


## Cache service

You can inject into your component the `NgPortalService` that expose some utils methods:

```ts
export class NgPortalService {

  /**
   * Send a "value" for the "key" (key or property name)
   */
  send(key: string, value: any): void;

  /**
   * Return an Observable for the "key" (key or property name)
   */
  get<K>(key: string): Observable<K>;

  /**
   * Return an Observable for all the "key" (key or property name)
   */
  getAll(): Observable<NgPortalServiceMessage>;
}
```

## Support

This is an open-source project. Star this [repository](https://github.com/nigrosimone/ng-portal), if you like it, or even [donate](https://www.paypal.com/paypalme/snwp). Thank you so much!
