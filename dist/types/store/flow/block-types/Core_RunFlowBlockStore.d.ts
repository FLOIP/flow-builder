import { Module } from 'vuex';
import { IRootState } from '../../../store';
import { IEmptyState } from '../../../store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "Core.RunFlow";
declare const Core_RunFlowBlockStore: Module<IEmptyState, IRootState>;
export default Core_RunFlowBlockStore;
