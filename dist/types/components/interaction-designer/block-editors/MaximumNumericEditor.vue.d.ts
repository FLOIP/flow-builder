import Lang from '../../../lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const MaximumNumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MaximumNumericEditor extends MaximumNumericEditor_base {
    readonly block: IBlock;
    get maxValue(): any;
    set maxValue(value: any);
}
export default MaximumNumericEditor;
