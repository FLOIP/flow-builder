import Lang from '../../../lib/filters/lang';
import { IGroupOption } from '../../../store/flow/block-types/Core_SetGroupMembershipStore';
import { IBlock, IGroupMembership } from '@floip/flow-runner';
declare const Core_SetGroupMembershipBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Core_SetGroupMembershipBlock extends Core_SetGroupMembershipBlock_base {
    readonly block: IBlock;
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
    groupsFromUiConfig: IGroupOption[];
    /**
     * If availableGroups is not provided, use the groups from the ui config
     * In general, we specify the availableGroups at the consumer level to customize this component
     */
    get finalGroupOptions(): IGroupMembership[];
}
export default Core_SetGroupMembershipBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
