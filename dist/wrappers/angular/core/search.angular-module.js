"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var search_angular_component_1 = require("./search.angular-component");
var NucleusSearchAngularModule = /** @class */ (function () {
    function NucleusSearchAngularModule() {
    }
    NucleusSearchAngularModule = __decorate([
        core_1.NgModule({
            declarations: [search_angular_component_1.NucleusSearchAngularComponent],
            exports: [search_angular_component_1.NucleusSearchAngularComponent],
            entryComponents: [search_angular_component_1.NucleusSearchAngularComponent],
            imports: [
                common_1.CommonModule
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], NucleusSearchAngularModule);
    return NucleusSearchAngularModule;
}());
exports.NucleusSearchAngularModule = NucleusSearchAngularModule;
//# sourceMappingURL=search.angular-module.js.map