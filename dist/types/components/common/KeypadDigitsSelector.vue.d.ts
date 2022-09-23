import Lang from '@/lib/filters/lang';
declare type MultiselectOption = {
    name: string;
    label: string;
};
declare const KeypadDigitsSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class KeypadDigitsSelector extends KeypadDigitsSelector_base {
    label: string;
    value: string;
    placeholder: string;
    validState: boolean;
    get options(): MultiselectOption[];
    get modelValue(): MultiselectOption | undefined;
    set modelValue(value: MultiselectOption | undefined);
}
export default KeypadDigitsSelector;
