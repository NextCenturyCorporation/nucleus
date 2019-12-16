/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/text-cloud/text-cloud.angular-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright 2019 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NucleusTextCloudAngularComponent } from './text-cloud.angular-component';
var NucleusTextCloudAngularModule = /** @class */ (function () {
    function NucleusTextCloudAngularModule() {
    }
    NucleusTextCloudAngularModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NucleusTextCloudAngularComponent],
                    exports: [NucleusTextCloudAngularComponent],
                    entryComponents: [NucleusTextCloudAngularComponent],
                    imports: [
                        CommonModule
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return NucleusTextCloudAngularModule;
}());
export { NucleusTextCloudAngularModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jbG91ZC5hbmd1bGFyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL251Y2xldXMtYW5ndWxhci8iLCJzb3VyY2VzIjpbIndyYXBwZXJzL3RleHQtY2xvdWQvdGV4dC1jbG91ZC5hbmd1bGFyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbEY7SUFBQTtJQVM2QyxDQUFDOztnQkFUN0MsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztvQkFDM0MsZUFBZSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7b0JBQ25ELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNwQzs7SUFDNEMsb0NBQUM7Q0FBQSxBQVQ5QyxJQVM4QztTQUFqQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE5IE5leHQgQ2VudHVyeSBDb3Jwb3JhdGlvblxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTnVjbGV1c1RleHRDbG91ZEFuZ3VsYXJDb21wb25lbnQgfSBmcm9tICcuL3RleHQtY2xvdWQuYW5ndWxhci1jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW051Y2xldXNUZXh0Q2xvdWRBbmd1bGFyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbTnVjbGV1c1RleHRDbG91ZEFuZ3VsYXJDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW051Y2xldXNUZXh0Q2xvdWRBbmd1bGFyQ29tcG9uZW50XSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIE51Y2xldXNUZXh0Q2xvdWRBbmd1bGFyTW9kdWxlIHsgfVxuIl19