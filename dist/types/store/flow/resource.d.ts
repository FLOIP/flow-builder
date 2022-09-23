import { IContext, IFlow, IResource, IResourceValue as IResourceDefinitionVariantOverModes, IResourceValue, SupportedContentType, SupportedMode } from '@floip/flow-runner';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IFlowsState } from '@/store/flow/index';
import { IRootState } from '@/store';
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
export declare type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>;
export declare type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>;
export declare type IResourceDefinitionVariantOverModesFilterWithResourceId = Partial<IResourceDefinitionVariantOverModes> & {
    resourceId: string;
};
export declare function findResourceWith(uuid: string, { resources }: IFlow): IResource;
export declare function findResourceVariantOverModesWith(uuid: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilter, flow: IFlow): IResourceDefinitionVariantOverModes;
export declare function findResourceVariantOverModesOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): IResourceValue;
export declare function findOrGenerateStubbedVariantFor(resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilterAsKey, flow: IFlow): IResourceDefinitionVariantOverModes;
export declare function findOrGenerateStubbedVariantOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilterAsKey): IResourceDefinitionVariantOverModes;
export declare function discoverContentTypesFor(mode: SupportedMode, resource?: IResource): SupportedContentType[] | undefined;
export declare function cleanupFlowResources(container: IContext, choiceMimeType: string): IContext;
