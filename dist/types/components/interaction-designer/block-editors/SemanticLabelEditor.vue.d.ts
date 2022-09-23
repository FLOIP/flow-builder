import { IBlock } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const SemanticLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class SemanticLabelEditor extends SemanticLabelEditor_base {
    readonly block: IBlock;
    get semanticLabel(): IBlock['semantic_label'];
    set semanticLabel(value: IBlock['semantic_label']);
    block_setSemanticLabel: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: IBlock['semantic_label'];
    }) => void;
}
export default SemanticLabelEditor;
