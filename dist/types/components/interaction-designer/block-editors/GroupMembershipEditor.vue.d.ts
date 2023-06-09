import { IBlock, ISetGroupMembershipBlockConfig, IGroupMembership } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { ConfigFieldType } from '../../../store/flow/utils/vuexBlockAndFlowHelpers';
declare type MembershipAction = {
    id: string;
    label: string;
    value: string;
};
declare enum MEMBERSHIP_ACTION {
    ADD = "add",
    REMOVE = "remove",
    CLEAR = "clear"
}
declare const GroupMembershipEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class GroupMembershipEditor extends GroupMembershipEditor_base {
    readonly block: IBlock;
    readonly availableGroups?: IGroupMembership[];
    readonly hasGroupsLoading: boolean;
    get userAddedGroups(): IGroupMembership[];
    set userAddedGroups(groups: IGroupMembership[]);
    get groupOptions(): IGroupMembership[];
    get availableMembershipActions(): MembershipAction[];
    get membershipAction(): MEMBERSHIP_ACTION;
    set membershipAction(value: MEMBERSHIP_ACTION);
    get isGroupListVisible(): boolean;
    get selectedGroups(): IGroupMembership[];
    set selectedGroups(groups: IGroupMembership[]);
    updateBlockConfig(config: Partial<ISetGroupMembershipBlockConfig>): void;
    onSearchChange(e: Event): void;
    onGroupAdd(name: string): void;
    block_updateConfigByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
    block_updateVendorMetadataByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
}
export default GroupMembershipEditor;
