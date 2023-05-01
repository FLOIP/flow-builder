import { IBlock } from '@floip/flow-runner';
import { ILogBlock } from '@floip/flow-runner/src/model/block/ILogBlock';
import Lang from '../../../lib/filters/lang';
declare const Core_LogBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Core_LogBlock extends Core_LogBlock_base {
    readonly block: ILogBlock;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get value(): string;
    commitMessageChange(value: string): Promise<string>;
    editMessage: (params: {
        blockId: IBlock['uuid'];
        message: string;
    }) => Promise<string>;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
    isEditable: boolean;
}
export default Core_LogBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
