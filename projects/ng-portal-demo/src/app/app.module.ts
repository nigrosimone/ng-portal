import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgPortalModule } from '../../../ng-portal/src/public-api';
import { InputComponent } from './input.component';
import { OutputComponent } from './output.component';
import { ModelComponent } from './model.component';
import { ModelKeyComponent } from './model-key.component';
import { InputKeyComponent } from './input-key.component';
import { OutputKeyComponent } from './output-key.component';

@NgModule({
  declarations: [AppComponent, InputComponent, OutputComponent, ModelComponent, ModelKeyComponent, InputKeyComponent, OutputKeyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgPortalModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
