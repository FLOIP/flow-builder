import { IBlock, IContext, IFlow, IResource, IResourceValue, IResourceValue as IResourceDefinitionVariantOverModes, SupportedContentType, SupportedMode } from '@floip/flow-runner';
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
export declare function findBlockRelatedResourcesUuids({ block }: {
    block: IBlock;
}): IResource['uuid'][];
/**
 * Compute resource index (cell index) for a table having X languages and Y modes
 *
 * @param languageIndex
 * @param modeIndex
 * @param supportedModesCount
 */
export declare function computeResourceIndex(languageIndex: number, modeIndex: number, supportedModesCount: number): number;
