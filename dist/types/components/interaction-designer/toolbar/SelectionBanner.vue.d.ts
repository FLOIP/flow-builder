import Lang from '@/lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const SelectionBanner_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class SelectionBanner extends SelectionBanner_base {
    deleting: boolean;
    updated(): void;
    get countSelectedBlocks(): number;
    confirmMultipleDeletion(): Promise<void>;
    handleMultipleDuplicate(): Promise<void>;
    selectedBlocks: IBlock['uuid'][];
    flow_clearMultiSelection: () => Promise<void>;
    flow_removeAllSelectedBlocks: () => Promise<void>;
    flow_duplicateAllSelectedBlocks: () => Promise<void>;
}
export default SelectionBanner;
