import { IBlock } from '@floip/flow-runner';
export declare enum OutputBranchingType {
    UNIFIED = "UNIFIED",
    EXIT_PER_CHOICE = "EXIT_PER_CHOICE",
    ADVANCED = "ADVANCED"
}
export interface IVendorMetadataWithBranchingType {
    floip: {
        ui_metadata: {
            branching_type: OutputBranchingType;
        };
    };
}
export interface IBlockWithBranchingType extends IBlock {
    vendor_metadata: IVendorMetadataWithBranchingType;
}
