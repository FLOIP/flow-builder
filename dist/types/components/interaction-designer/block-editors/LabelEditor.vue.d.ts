import { IBlock } from '@floip/flow-runner';
declare const LabelEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class LabelEditor extends LabelEditor_base {
    readonly block: IBlock;
    get blockLabel(): IBlock['label'];
    set blockLabel(value: IBlock['label']);
    emitGearClickedEvent(): void;
    block_setLabel: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: IBlock['label'];
    }) => void;
}
export default LabelEditor;
