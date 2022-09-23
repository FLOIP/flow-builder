import { Module } from 'vuex';
import { IRootState } from '../../../store';
import { IEmptyState } from '../../../store/flow/block-types/BaseBlock';
export interface IGroupOption {
    id: string;
    name: string;
}
export declare const ADD_KEY = "add";
export declare const REMOVE_KEY = "remove";
export declare const BLOCK_TYPE = "Core.SetGroupMembership";
declare const Core_SetGroupMembershipStore: Module<IEmptyState, IRootState>;
export default Core_SetGroupMembershipStore;
