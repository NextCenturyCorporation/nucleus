import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { ExampleModule } from './example.module';

import { NucleusFilterAngularModule, NucleusSearchAngularModule } from '@caci-critical-insight-solutions/nucleus-wrappers-angular';

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
