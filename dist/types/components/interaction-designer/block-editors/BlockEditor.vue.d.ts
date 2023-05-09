import { IBlock, IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const BlockEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockEditor extends BlockEditor_base {
    activeBlock?: IBlock;
    interactionDesignerMainBoundingClientRect: DOMRect;
    activeFlow?: IFlow;
    get currentHeight(): string;
}
export default BlockEditor;
