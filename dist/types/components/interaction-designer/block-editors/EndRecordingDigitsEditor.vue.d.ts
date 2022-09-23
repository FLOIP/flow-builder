import { IBlock } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const EndRecordingDigitsEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class EndRecordingDigitsEditor extends EndRecordingDigitsEditor_base {
    hasIvr: boolean;
    block: IBlock;
    get endRecordingDigits(): string;
    set endRecordingDigits(value: string);
}
export default EndRecordingDigitsEditor;
