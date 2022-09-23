import { IBlock, IFlow, IGroupMembership } from '@floip/flow-runner';
declare const Core_SetGroupMembershipBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class Core_SetGroupMembershipBlock extends Core_SetGroupMembershipBlock_base {
    readonly block: IBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    /**
     * The availableGroups and hasGroupsLoading are forwarded to group-membership-editor as is.
     * @see group-membership-editor for details of use
     */
    readonly availableGroups?: IGroupMembership[];
    readonly hasGroupsLoading?: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default Core_SetGroupMembershipBlock;
export declare const install: any;
