import { IBlock } from '@floip/flow-runner';
declare const ThresholdEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class ThresholdEditor extends ThresholdEditor_base {
    readonly block: IBlock;
    readonly defaultValue = 5;
    get threshold(): number;
    set threshold(value: number);
}
export default ThresholdEditor;
