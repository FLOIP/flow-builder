import { IBlock, IBlockExit } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { ConfigFieldType } from '../../../store/flow/utils/vuexBlockAndFlowHelpers';
import { OutputBranchingType } from '../../../components/interaction-designer/block-editors/BlockOutputBranchingConfig.model';
declare const BlockOutputBranchingConfig_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockOutputBranchingConfig extends BlockOutputBranchingConfig_base {
    readonly block: IBlock;
    readonly hasExitPerChoice: boolean;
    readonly hasUnifiedExit: boolean;
    readonly labelClass?: string;
    OutputBranchingType: typeof OutputBranchingType;
    mounted(): void;
    get selectedBranchingType(): OutputBranchingType;
    set selectedBranchingType(value: OutputBranchingType);
    get isBranchingTypeExitPerChoice(): boolean;
    get isBranchingTypeUnified(): boolean;
    get isBranchingTypeAdvanced(): boolean;
    block_updateVendorMetadataByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
    block_exitClearDestinationBlockFor: ({ blockExit }: {
        blockExit: IBlockExit;
    }) => void;
}
export default BlockOutputBranchingConfig;
