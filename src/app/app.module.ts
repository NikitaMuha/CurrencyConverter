import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main_page/main-page.component';
import { ConvertorFormComponent } from './components/convertor-form/convertor-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderCurrencyComponent } from './components/header-currency/header-currency.component';
import { ConvertorComponent } from './components/convertor/convertor.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ConvertorFormComponent,
    HeaderComponent,
    HeaderCurrencyComponent,
    ConvertorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelectModule,
    ReactiveFormsModule,
    MatError,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
