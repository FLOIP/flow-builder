import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { BlockConfigFieldType } from '../../../store/flow/block';
import { IGroupOption } from '../../../store/flow/block-types/Core_SetGroupMembershipStore';
declare const GroupSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class GroupSelector extends GroupSelector_base {
    readonly block: IBlock;
    get selectedGroup(): IGroupOption;
    set selectedGroup(value: IGroupOption);
    block_updateConfigByPath: ({ blockId, path, value, }: {
        blockId: string;
        path: string;
        value: BlockConfigFieldType;
    }) => void;
    groups: IGroupOption[];
}
export default GroupSelector;
