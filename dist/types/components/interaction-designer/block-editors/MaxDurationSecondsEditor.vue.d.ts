import Lang from '../../../lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const MaxDurationSecondsEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MaxDurationSecondsEditor extends MaxDurationSecondsEditor_base {
    readonly block: IBlock;
    readonly hasIvr: boolean;
    readonly defaultMaxDuration = 60;
    get duration(): number;
    set duration(value: number);
    created(): void;
}
export default MaxDurationSecondsEditor;
