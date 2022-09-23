import Lang from '@/lib/filters/lang';
declare const FloatEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class FloatEditor extends FloatEditor_base {
    readonly label: string | number;
    readonly placeholder: string;
    readonly step: string;
    readonly value: string | number;
    readonly min: string | number;
    readonly regexFloatFiltering: string;
    readonly validState?: boolean;
    get isInvalid(): boolean;
    filterFloat(e: KeyboardEvent): void;
}
export default FloatEditor;
