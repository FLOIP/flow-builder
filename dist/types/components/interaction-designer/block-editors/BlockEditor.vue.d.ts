import { IBlock, IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const BlockEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockEditor extends BlockEditor_base {
    activeBlock?: IBlock;
    interactionDesignerHeaderBoundingClientRect: DOMRect;
    activeFlow?: IFlow;
    get topPosition(): string;
}
export default BlockEditor;
