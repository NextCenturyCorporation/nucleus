"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var search_service_1 = require("./search.service");
var SearchServiceMock = /** @class */ (function (_super) {
    __extends(SearchServiceMock, _super);
    function SearchServiceMock() {
        return _super.call(this, null) || this;
    }
    SearchServiceMock.prototype.canRunSearch = function (datastoreType, datastoreHost) {
        return !!(datastoreType && datastoreHost);
    };
    SearchServiceMock.prototype.runSearch = function (__datastoreType, __datastoreHost, __searchObject) {
        return {
            always: function () {
                // Do nothing.
            },
            abort: function () {
                // Do nothing.
            },
            done: function () {
                // Do nothing.
            },
            fail: function () {
                // Do nothing.
            }
        };
    };
    return SearchServiceMock;
}(search_service_1.SearchService));
exports.SearchServiceMock = SearchServiceMock;
//# sourceMappingURL=mock.search.service.js.map