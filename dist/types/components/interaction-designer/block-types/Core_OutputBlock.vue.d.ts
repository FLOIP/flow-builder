import { IOutputBlock } from '@floip/flow-runner/src/model/block/IOutputBlock';
import { IBlock, IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const Core_OutputBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Core_OutputBlock extends Core_OutputBlock_base {
    readonly block: IOutputBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    readonly expressionEditorRows: number;
    get value(): string;
    editOutputExpression: (params: {
        blockId: IBlock['uuid'];
        value: string;
    }) => Promise<string>;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
    isEditable: boolean;
    commitExpressionChange(value: string): Promise<string>;
}
export default Core_OutputBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
