import { Module } from 'vuex';
import { IRootState } from '../../../store';
import { IEmptyState } from '../../../store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "Core.Log";
declare const Core_LogBlockStore: Module<IEmptyState, IRootState>;
export default Core_LogBlockStore;
