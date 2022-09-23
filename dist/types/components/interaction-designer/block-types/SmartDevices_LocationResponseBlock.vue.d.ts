import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const SmartDevices_LocationResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class SmartDevices_LocationResponseBlock extends SmartDevices_LocationResponseBlock_base {
    readonly block: IBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    updateThreshold(value: number): void;
    updateTimeout(value: number): void;
    get promptResource(): IResource;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    setAccuracyThreshold: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: number;
    }) => Promise<string>;
    setAccuracyTimeout: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: number;
    }) => Promise<string>;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
    isEditable: boolean;
}
export default SmartDevices_LocationResponseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
