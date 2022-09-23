import { IBlock, IFlow } from '@floip/flow-runner';
declare const ExitBlockEditorToggle_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class ExitBlockEditorToggle extends ExitBlockEditorToggle_base {
    readonly flow: IFlow;
    readonly blockId: IBlock['uuid'];
    readonly isEditable: boolean;
    readonly hasClipboard: boolean;
    get isExitBlock(): boolean;
    toggleExitBlock(): void;
    flow_setExitBlockId: ({ flowId, blockId }: {
        flowId: string;
        blockId: IBlock['uuid'];
    }) => void;
}
export default ExitBlockEditorToggle;
