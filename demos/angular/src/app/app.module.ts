import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { ExampleModule } from './example.module';

import { NextCenturyFilterAngularModule } from 'component-library/dist/wrappers/angular/core/filter.angular-module';
import { NextCenturySearchAngularModule } from 'component-library/dist/wrappers/angular/core/search.angular-module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ExampleModule,
        NextCenturyFilterAngularModule,
        NextCenturySearchAngularModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
