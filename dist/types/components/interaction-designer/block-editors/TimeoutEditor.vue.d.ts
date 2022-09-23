import { IBlock } from '@floip/flow-runner';
declare const TimeoutEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class TimeoutEditor extends TimeoutEditor_base {
    readonly block: IBlock;
    readonly defaultValue = 120;
    get timeout(): number;
    set timeout(value: number);
}
export default TimeoutEditor;
