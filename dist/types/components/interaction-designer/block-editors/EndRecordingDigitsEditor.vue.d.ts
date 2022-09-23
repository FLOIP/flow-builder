import { IBlock } from '@floip/flow-runner';
declare const EndRecordingDigitsEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class EndRecordingDigitsEditor extends EndRecordingDigitsEditor_base {
    hasIvr: boolean;
    block: IBlock;
    get endRecordingDigits(): string;
    set endRecordingDigits(value: string);
}
export default EndRecordingDigitsEditor;
