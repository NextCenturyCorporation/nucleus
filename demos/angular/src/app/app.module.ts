import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { ExampleModule } from './example.module';

import { NucleusFilterAngularModule } from 'nucleus/dist/wrappers/angular/core/filter.angular-module';
import { NucleusSearchAngularModule } from 'nucleus/dist/wrappers/angular/core/search.angular-module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ExampleModule,
        NucleusFilterAngularModule,
        NucleusSearchAngularModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
