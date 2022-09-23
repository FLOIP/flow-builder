import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import { IMessageBlock } from '@floip/flow-runner/src/model/block/IMessageBlock';
import Lang from '../../../lib/filters/lang';
declare const MobilePrimitives_MessageBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
declare class MobilePrimitives_MessageBlock extends MobilePrimitives_MessageBlock_base {
    readonly block: IMessageBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get promptResource(): IResource;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    isEditable: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default MobilePrimitives_MessageBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
