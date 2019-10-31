export declare enum AggregationType {
    AVG = "avg",
    COUNT = "count",
    MAX = "max",
    MIN = "min",
    SUM = "sum"
}
export declare enum CompoundFilterType {
    AND = "and",
    OR = "or"
}
export declare enum SortOrder {
    ASCENDING = "ascending",
    DESCENDING = "descending"
}
export declare enum TimeInterval {
    MINUTE = "minute",
    HOUR = "hour",
    DAY_OF_MONTH = "dayOfMonth",
    MONTH = "month",
    YEAR = "year"
}
declare type OptionCallback = (options: any) => boolean;
declare class OptionChoice {
    prettyName: string;
    variable: any;
    constructor(prettyName: string, variable: any);
}
export declare const OptionChoices: {
    Aggregation: OptionChoice[];
    AscendingFalseDescendingTrue: OptionChoice[];
    DateGranularity: OptionChoice[];
    HideFalseShowTrue: OptionChoice[];
    NoFalseYesTrue: OptionChoice[];
    OrFalseAndTrue: OptionChoice[];
    ShowFalseHideTrue: OptionChoice[];
    YesFalseNoTrue: OptionChoice[];
};
export declare enum OptionType {
    COLOR = "COLOR",
    DATABASE = "DATABASE",
    DATASTORE = "DATASTORE",
    FIELD = "FIELD",
    FIELD_ARRAY = "FIELD_ARRAY",
    FREE_TEXT = "FREE_TEXT",
    MULTIPLE_SELECT = "MULTIPLE_SELECT",
    NON_PRIMITIVE = "NON_PRIMITIVE",
    NUMBER = "NUMBER",
    SELECT = "SELECT",
    TABLE = "TABLE"
}
export declare class ConfigOption {
    optionType: OptionType;
    isRequired: boolean;
    bindingKey: string;
    prettyName: string | OptionCallback;
    valueDefault: any;
    valueChoices: OptionChoice[];
    hideFromMenu: boolean | OptionCallback;
    valueCurrent: any;
    constructor(optionType: OptionType, isRequired: boolean, bindingKey: string, prettyName: string | OptionCallback, valueDefault: any, valueChoices: OptionChoice[], hideFromMenu?: boolean | OptionCallback);
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     */
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionColor extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, hideFromMenu?: boolean | OptionCallback);
}
export declare class ConfigOptionDatabase extends ConfigOption {
    constructor();
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionDatastore extends ConfigOption {
    constructor();
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionFieldArray extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, hideFromMenu?: boolean | OptionCallback);
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionField extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, hideFromMenu?: boolean | OptionCallback);
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionFreeText extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, hideFromMenu?: boolean | OptionCallback);
}
export declare class ConfigOptionMultipleSelect extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, valueChoices: OptionChoice[], hideFromMenu?: boolean | OptionCallback);
}
export declare class ConfigOptionNonPrimitive extends ConfigOption {
    private _intermediateValue;
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, hideFromMenu?: boolean | OptionCallback);
    intermediateValue: string;
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionNumber extends ConfigOption {
    private _intermediateValue;
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, hideFromMenu?: boolean | OptionCallback);
    intermediateValue: string | number;
    getValueToSaveInBindings(): any;
}
export declare class ConfigOptionSelect extends ConfigOption {
    constructor(bindingKey: string, prettyName: string | OptionCallback, isRequired: boolean, valueDefault: any, valueChoices: OptionChoice[], hideFromMenu?: boolean | OptionCallback);
}
export declare class ConfigOptionTable extends ConfigOption {
    constructor();
    /**
     * Returns the current value to save in the bindings.
     *
     * @return {any}
     * @override
     */
    getValueToSaveInBindings(): any;
}
/**
 * Returns whether the given ConfigOption object is a FIELD or FIELD_ARRAY.
 */
export declare function isFieldOption(option: any): boolean;
export {};
