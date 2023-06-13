import { IBlock, IContext, IFlow, IResource, IResourceValue, IResourceValue as IResourceDefinitionVariantOverModes, SupportedContentType, SupportedMode } from '@floip/flow-runner';
export declare type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>;
export declare type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>;
export declare function findResourceWith(uuid: string, { resources }: IFlow): IResource;
export declare function findResourceVariantOverModesWith(uuid: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilter, flow: IFlow): IResourceDefinitionVariantOverModes;
export declare function findResourceVariantOverModesOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): IResourceValue;
/** @returns resource variant's index in the resource.values array, -1 if not found */
export declare function findIndexForResourceVariant(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): number;
export declare function findOrGenerateStubbedVariantFor(resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilterAsKey, flow: IFlow): IResourceDefinitionVariantOverModes;
export declare function findOrGenerateStubbedVariantOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilterAsKey): IResourceDefinitionVariantOverModes;
export declare function discoverContentTypesFor(mode: SupportedMode, resource?: IResource): SupportedContentType[] | undefined;
export declare function cleanupFlowBeforePersisting(container: IContext, choiceMimeType: string): IContext;
export declare function findBlockRelatedResourcesUuids({ block }: {
    block: IBlock;
}): IResource['uuid'][];
export declare function isBlockUsingResource(block: IBlock, resourceUuid: string): boolean;
