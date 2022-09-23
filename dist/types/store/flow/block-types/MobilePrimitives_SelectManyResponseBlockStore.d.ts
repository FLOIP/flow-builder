import { GetterTree, Module } from 'vuex';
import { IRootState } from '@/store';
import { IEmptyState } from '@/store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "MobilePrimitives.SelectManyResponse";
export declare const getters: GetterTree<IEmptyState, IRootState>;
declare const MobilePrimitives_SelectManyResponseBlockStore: Module<IEmptyState, IRootState>;
export default MobilePrimitives_SelectManyResponseBlockStore;
