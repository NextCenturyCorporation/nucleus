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
var _ = require("lodash");
var yaml = require("js-yaml");
var AggregationType;
(function (AggregationType) {
    AggregationType["AVG"] = "avg";
    AggregationType["COUNT"] = "count";
    AggregationType["MAX"] = "max";
    AggregationType["MIN"] = "min";
    AggregationType["SUM"] = "sum";
})(AggregationType = exports.AggregationType || (exports.AggregationType = {}));
var CompoundFilterType;
(function (CompoundFilterType) {
    CompoundFilterType["AND"] = "and";
    CompoundFilterType["OR"] = "or";
})(CompoundFilterType = exports.CompoundFilterType || (exports.CompoundFilterType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASCENDING"] = "ascending";
    SortOrder["DESCENDING"] = "descending";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var TimeInterval;
(function (TimeInterval) {
    TimeInterval["SECOND"] = "second";
    TimeInterval["MINUTE"] = "minute";
    TimeInterval["HOUR"] = "hour";
    TimeInterval["DAY_OF_MONTH"] = "dayOfMonth";
    TimeInterval["MONTH"] = "month";
    TimeInterval["YEAR"] = "year";
})(TimeInterval = exports.TimeInterval || (exports.TimeInterval = {}));
var OptionChoice = /** @class */ (function () {
    function OptionChoice(prettyName, variable) {
        this.prettyName = prettyName;
        this.variable = variable;
    }
    return OptionChoice;
}());
exports.OptionChoices = {
    Aggregation: [
        new OptionChoice('Count', AggregationType.COUNT),
        new OptionChoice('Average', AggregationType.AVG),
        new OptionChoice('Max', AggregationType.MAX),
        new OptionChoice('Min', AggregationType.MIN),
        new OptionChoice('Sum', AggregationType.SUM)
    ],
    AscendingFalseDescendingTrue: [
        new OptionChoice('Ascending', false),
        new OptionChoice('Descending', true)
    ],
    DateGranularity: [
        new OptionChoice('Year', TimeInterval.YEAR),
        new OptionChoice('Month', TimeInterval.MONTH),
        new OptionChoice('Day', TimeInterval.DAY_OF_MONTH),
        new OptionChoice('Hour', TimeInterval.HOUR),
        new OptionChoice('Minute', TimeInterval.MINUTE)
    ],
    HideFalseShowTrue: [
        new OptionChoice('Hide', false),
        new OptionChoice('Show', true)
    ],
    NoFalseYesTrue: [
        new OptionChoice('No', false),
        new OptionChoice('Yes', true)
    ],
    OrFalseAndTrue: [
        new OptionChoice('OR', false),
        new OptionChoice('AND', true)
    ],
    ShowFalseHideTrue: [
        new OptionChoice('Show', false),
        new OptionChoice('Hide', true)
    ],
    YesFalseNoTrue: [
        new OptionChoice('Yes', false),
        new OptionChoice('No', true)
    ]
};
var OptionType;
(function (OptionType) {
    OptionType["COLOR"] = "COLOR";
    OptionType["DATABASE"] = "DATABASE";
    OptionType["DATASTORE"] = "DATASTORE";
    OptionType["FIELD"] = "FIELD";
    OptionType["FIELD_ARRAY"] = "FIELD_ARRAY";
    OptionType["FREE_TEXT"] = "FREE_TEXT";
    OptionType["MULTIPLE_SELECT"] = "MULTIPLE_SELECT";
    OptionType["NON_PRIMITIVE"] = "NON_PRIMITIVE";
    OptionType["NUMBER"] = "NUMBER";
    OptionType["SELECT"] = "SELECT";
    OptionType["TABLE"] = "TABLE";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
var ConfigOption = /** @class */ (function () {
    function ConfigOption(optionType, isRequired, bindingKey, prettyName, valueDefault, valueChoices, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        this.optionType = optionType;
        this.isRequired = isRequired;
        this.bindingKey = bindingKey;
        this.prettyName = prettyName;
        this.valueDefault = valueDefault;
        this.valueChoices = valueChoices;
        this.hideFromMenu = hideFromMenu;
        // Change null to undefined or else the YAML library will consider it a string.
        if (this.valueDefault === null) {
            this.valueDefault = undefined;
        }
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     */
    ConfigOption.prototype.getValueToSaveInBindings = function () {
        // Change null to undefined or else the YAML library will consider it a string.
        return this.valueCurrent === null ? undefined : this.valueCurrent;
    };
    return ConfigOption;
}());
exports.ConfigOption = ConfigOption;
var ConfigOptionColor = /** @class */ (function (_super) {
    __extends(ConfigOptionColor, _super);
    function ConfigOptionColor(bindingKey, prettyName, isRequired, valueDefault, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        return _super.call(this, OptionType.COLOR, isRequired, bindingKey, prettyName, valueDefault, undefined, hideFromMenu) || this;
    }
    return ConfigOptionColor;
}(ConfigOption));
exports.ConfigOptionColor = ConfigOptionColor;
var ConfigOptionDatabase = /** @class */ (function (_super) {
    __extends(ConfigOptionDatabase, _super);
    function ConfigOptionDatabase() {
        // Value default and choices are set elsewhere.
        return _super.call(this, OptionType.DATABASE, true, 'database', 'Database', undefined, undefined, false) || this;
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    ConfigOptionDatabase.prototype.getValueToSaveInBindings = function () {
        return this.valueCurrent ? this.valueCurrent.name : undefined;
    };
    return ConfigOptionDatabase;
}(ConfigOption));
exports.ConfigOptionDatabase = ConfigOptionDatabase;
var ConfigOptionDatastore = /** @class */ (function (_super) {
    __extends(ConfigOptionDatastore, _super);
    function ConfigOptionDatastore() {
        // Value default and choices are set elsewhere.
        return _super.call(this, OptionType.DATASTORE, true, 'datastore', 'Datastore', undefined, undefined, false) || this;
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    ConfigOptionDatastore.prototype.getValueToSaveInBindings = function () {
        return this.valueCurrent ? this.valueCurrent.name : undefined;
    };
    return ConfigOptionDatastore;
}(ConfigOption));
exports.ConfigOptionDatastore = ConfigOptionDatastore;
var ConfigOptionFieldArray = /** @class */ (function (_super) {
    __extends(ConfigOptionFieldArray, _super);
    function ConfigOptionFieldArray(bindingKey, prettyName, isRequired, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        // Value default and choices are set elsewhere.
        return _super.call(this, OptionType.FIELD_ARRAY, isRequired, bindingKey, prettyName, undefined, undefined, hideFromMenu) || this;
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    ConfigOptionFieldArray.prototype.getValueToSaveInBindings = function () {
        return this.valueCurrent.map(function (fieldElement) { return fieldElement.columnName; });
    };
    return ConfigOptionFieldArray;
}(ConfigOption));
exports.ConfigOptionFieldArray = ConfigOptionFieldArray;
var ConfigOptionField = /** @class */ (function (_super) {
    __extends(ConfigOptionField, _super);
    function ConfigOptionField(bindingKey, prettyName, isRequired, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        // Value default and choices are set elsewhere.
        return _super.call(this, OptionType.FIELD, isRequired, bindingKey, prettyName, undefined, undefined, hideFromMenu) || this;
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    ConfigOptionField.prototype.getValueToSaveInBindings = function () {
        return this.valueCurrent.columnName;
    };
    return ConfigOptionField;
}(ConfigOption));
exports.ConfigOptionField = ConfigOptionField;
var ConfigOptionFreeText = /** @class */ (function (_super) {
    __extends(ConfigOptionFreeText, _super);
    function ConfigOptionFreeText(bindingKey, prettyName, isRequired, valueDefault, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        return _super.call(this, OptionType.FREE_TEXT, isRequired, bindingKey, prettyName, valueDefault, undefined, hideFromMenu) || this;
    }
    return ConfigOptionFreeText;
}(ConfigOption));
exports.ConfigOptionFreeText = ConfigOptionFreeText;
var ConfigOptionMultipleSelect = /** @class */ (function (_super) {
    __extends(ConfigOptionMultipleSelect, _super);
    function ConfigOptionMultipleSelect(bindingKey, prettyName, isRequired, valueDefault, valueChoices, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        return _super.call(this, OptionType.MULTIPLE_SELECT, isRequired, bindingKey, prettyName, valueDefault, valueChoices, hideFromMenu) || this;
    }
    return ConfigOptionMultipleSelect;
}(ConfigOption));
exports.ConfigOptionMultipleSelect = ConfigOptionMultipleSelect;
var ConfigOptionNonPrimitive = /** @class */ (function (_super) {
    __extends(ConfigOptionNonPrimitive, _super);
    function ConfigOptionNonPrimitive(bindingKey, prettyName, isRequired, valueDefault, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        var _this = _super.call(this, OptionType.NON_PRIMITIVE, isRequired, bindingKey, prettyName, valueDefault, undefined, hideFromMenu) || this;
        _this._intermediateValue = undefined;
        return _this;
    }
    Object.defineProperty(ConfigOptionNonPrimitive.prototype, "intermediateValue", {
        get: function () {
            if (this._intermediateValue === undefined) {
                try {
                    var value = this.valueCurrent || this.valueDefault;
                    this._intermediateValue = _.isEmpty(value) ? '' : yaml.safeDump(value);
                }
                catch (_a) {
                    console.error('ERROR WidgetNonPrimitiveOption: get intermediateValue() failed');
                }
                this._intermediateValue = this._intermediateValue || '';
            }
            return this._intermediateValue;
        },
        set: function (value) {
            this._intermediateValue = value;
            try {
                this.valueCurrent = _.isEmpty(value) ? undefined : yaml.safeLoad(this._intermediateValue);
            }
            catch (_a) {
                console.error('ERROR WidgetNonPrimitiveOption: set intermediateValue() failed');
            }
        },
        enumerable: true,
        configurable: true
    });
    ConfigOptionNonPrimitive.prototype.getValueToSaveInBindings = function () {
        delete this._intermediateValue;
        return this.valueCurrent || this.valueDefault;
    };
    return ConfigOptionNonPrimitive;
}(ConfigOption));
exports.ConfigOptionNonPrimitive = ConfigOptionNonPrimitive;
var ConfigOptionNumber = /** @class */ (function (_super) {
    __extends(ConfigOptionNumber, _super);
    function ConfigOptionNumber(bindingKey, prettyName, isRequired, valueDefault, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        var _this = _super.call(this, OptionType.NUMBER, isRequired, bindingKey, prettyName, valueDefault, undefined, hideFromMenu) || this;
        _this._intermediateValue = undefined;
        return _this;
    }
    Object.defineProperty(ConfigOptionNumber.prototype, "intermediateValue", {
        get: function () {
            if (this._intermediateValue === undefined) {
                try {
                    var value = this.valueCurrent || this.valueDefault;
                    this._intermediateValue = _.isNumber(_.toNumber(value)) ? value : null;
                }
                catch (_a) {
                    console.error('ERROR WidgetNumberOption: get intermediateValue() failed');
                }
                this._intermediateValue = this._intermediateValue;
            }
            return this._intermediateValue;
        },
        set: function (value) {
            this._intermediateValue = value;
            try {
                this.valueCurrent = !_.isNaN(Number(value)) ? this._intermediateValue : null;
            }
            catch (_a) {
                console.error('ERROR WidgetNumberOption: set intermediateValue() failed');
            }
        },
        enumerable: true,
        configurable: true
    });
    ConfigOptionNumber.prototype.getValueToSaveInBindings = function () {
        delete this._intermediateValue;
        return this.valueCurrent || this.valueDefault;
    };
    return ConfigOptionNumber;
}(ConfigOption));
exports.ConfigOptionNumber = ConfigOptionNumber;
var ConfigOptionSelect = /** @class */ (function (_super) {
    __extends(ConfigOptionSelect, _super);
    function ConfigOptionSelect(bindingKey, prettyName, isRequired, valueDefault, valueChoices, hideFromMenu) {
        if (hideFromMenu === void 0) { hideFromMenu = false; }
        return _super.call(this, OptionType.SELECT, isRequired, bindingKey, prettyName, valueDefault, valueChoices, hideFromMenu) || this;
    }
    return ConfigOptionSelect;
}(ConfigOption));
exports.ConfigOptionSelect = ConfigOptionSelect;
var ConfigOptionTable = /** @class */ (function (_super) {
    __extends(ConfigOptionTable, _super);
    function ConfigOptionTable() {
        // Value default and choices are set elsewhere.
        return _super.call(this, OptionType.TABLE, true, 'table', 'Table', undefined, undefined, false) || this;
    }
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    ConfigOptionTable.prototype.getValueToSaveInBindings = function () {
        return this.valueCurrent ? this.valueCurrent.name : undefined;
    };
    return ConfigOptionTable;
}(ConfigOption));
exports.ConfigOptionTable = ConfigOptionTable;
/**
 * Returns whether the given ConfigOption object is a FIELD or FIELD_ARRAY.
 */
function isFieldOption(option) {
    return option.optionType === OptionType.FIELD || option.optionType === OptionType.FIELD_ARRAY;
}
exports.isFieldOption = isFieldOption;
//# sourceMappingURL=config-option.js.map