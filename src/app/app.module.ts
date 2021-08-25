import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AddComponent } from './component/add/add.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    HttpClientModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
