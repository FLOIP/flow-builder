import { IBlock } from '@floip/flow-runner';
declare const MaxDigitEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class MaxDigitEditor extends MaxDigitEditor_base {
    readonly block: IBlock;
    readonly hasIvr: boolean;
    get maxDigits(): number;
    set maxDigits(value: number);
}
export default MaxDigitEditor;
