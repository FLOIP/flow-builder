import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import { IOpenResponseBlock } from '@floip/flow-runner/src/model/block/IOpenResponseBlock';
import Lang from '../../../lib/filters/lang';
declare const MobilePrimitives_OpenResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
declare class MobilePrimitives_OpenResponseBlock extends MobilePrimitives_OpenResponseBlock_base {
    readonly block: IOpenResponseBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get promptResource(): IResource;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    hasTextMode: boolean;
    hasVoiceMode: boolean;
    setMaxDurationSeconds: (newDuration: number) => Promise<void>;
    setEndRecordingDigits: (endRecordingDigits: string) => Promise<void>;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
    isEditable: boolean;
}
export default MobilePrimitives_OpenResponseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
