import { Module } from 'vuex';
import { IRootState } from '@/store';
import { IEmptyState } from '@/store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "Core.Output";
declare const Core_OutputBlockStore: Module<IEmptyState, IRootState>;
export default Core_OutputBlockStore;
