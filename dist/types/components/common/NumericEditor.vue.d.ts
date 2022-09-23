import Lang from '../../lib/filters/lang';
declare const NumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class NumericEditor extends NumericEditor_base {
    readonly validState?: boolean;
    readonly label: string | number;
    readonly placeholder: string;
    readonly value?: string | number;
    readonly regexNumericFiltering: string;
    readonly subTitle: string;
    readonly tooltipHint: string;
    get isInvalid(): boolean;
    filterNumeric(e: KeyboardEvent): void;
}
export default NumericEditor;
