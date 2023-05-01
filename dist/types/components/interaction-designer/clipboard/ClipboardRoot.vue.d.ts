import { IContext, FlowRunner } from '@floip/flow-runner';
import { IFlowsState } from '../../../store/flow';
import Lang from '../../../lib/filters/lang';
import { BlocksData } from '../../../store/clipboard';
declare const ClipboardRoot_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export default class ClipboardRoot extends ClipboardRoot_base {
    runner: FlowRunner;
    context: IContext;
    isComplete: boolean;
    unsupportedBlockName: string;
    cursorChangeInProgress: boolean;
    created(): void;
    content(promptId: string): string | undefined;
    initializeFlowRunner(): Promise<void>;
    goNext(): Promise<void>;
    onEditComplete(index: number): Promise<void>;
    closeSimulator(): void;
    destroyed(): void;
    currentFlowsState: IFlowsState;
    blocksData: BlocksData[];
    isBlockFocused: boolean;
    setSimulatorActive: (value: boolean) => void;
    resetBlocksData: () => void;
    setIsFocused: (data: {
        index: number;
        value: boolean;
    }) => void;
    addToBlocksData: (data: BlocksData) => void;
    removeFromBlocksData: (index: number) => void;
}
export {};
