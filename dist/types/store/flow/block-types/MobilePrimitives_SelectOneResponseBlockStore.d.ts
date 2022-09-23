import { GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { IEmptyState } from '@/store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "MobilePrimitives.SelectOneResponse";
export declare const getters: GetterTree<IEmptyState, IRootState>;
export declare const mutations: MutationTree<IEmptyState>;
declare const MobilePrimitives_SelectOneResponseBlockStore: Module<IEmptyState, IRootState>;
export default MobilePrimitives_SelectOneResponseBlockStore;
