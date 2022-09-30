import { Module } from 'vuex';
import { IRootState } from '../../../store';
import { IEmptyState } from '../../../store/flow/block-types/BaseBlock';
export declare const BLOCK_TYPE = "MobilePrimitives.NumericResponse";
export declare function normalizeNumericConfigProperty(value?: number | string | null): [number, boolean];
declare const MobilePrimitives_NumericResponseBlockStore: Module<IEmptyState, IRootState>;
export default MobilePrimitives_NumericResponseBlockStore;
