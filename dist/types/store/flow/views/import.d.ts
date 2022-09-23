import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { IBlock, IContext } from '@floip/flow-runner';
import { IContactPropertyMultipleChoice } from '../block-types/Core_SetContactPropertyStore.model';
import { IGroupOption } from '../block-types/Core_SetGroupMembershipStore';
export declare const getters: GetterTree<IImportState, IRootState>;
export declare const mutations: MutationTree<IImportState>;
export declare const actions: ActionTree<IImportState, IRootState>;
export interface IImportState {
    matchingLanguages: ILanguage[];
    missingLanguages: ILanguage[];
    existingLanguagesWithoutMatch: ILanguage[];
    blocksMissingProperties: {
        [key: string]: string[];
    };
    missingProperties: {
        name: string;
        blockIds: string[];
    }[];
    matchingProperties: IContactPropertyMultipleChoice[];
    existingPropertiesWithoutMatch: IContactPropertyMultipleChoice[];
    blocksMissingGroups: {
        [key: string]: {
            group_name: string;
            blockIds: string[];
        };
    };
    missingGroups: {
        id: string;
        group_name: string;
        blockIds: string[];
    }[];
    matchingGroups: IGroupOption[];
    existingGroupsWithoutMatch: IGroupOption[];
    flowContainer: IContext | null;
    flowJsonText: string;
    flowSpecVersion: string | undefined;
    propertyBlocks: IBlock[];
    groupBlocks: IBlock[];
    updating: boolean;
}
export declare const stateFactory: () => IImportState;
declare const _default: {
    namespaced: boolean;
    state: () => IImportState;
    getters: GetterTree<IImportState, IRootState>;
    mutations: MutationTree<IImportState>;
    actions: ActionTree<IImportState, IRootState>;
};
export default _default;
