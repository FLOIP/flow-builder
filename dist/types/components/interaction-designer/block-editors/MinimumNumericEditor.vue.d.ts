import Lang from '../../../lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const MinimumNumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MinimumNumericEditor extends MinimumNumericEditor_base {
    readonly block: IBlock;
    get minValue(): any;
    set minValue(value: any);
}
export default MinimumNumericEditor;
