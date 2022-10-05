import { IBlock, IContext, IResource } from '@floip/flow-runner';
export declare function updateResourcesForLanguageMatch(resources: IResource[], oldId: string, newId: string): IResource[];
export declare function mergeFlowContainer(existingFlowContainer: IContext, newFlowContainer: IContext): IContext;
export declare function checkSingleFlowOnly(flowContainer: IContext): boolean;
export declare function detectedLanguageChanges({ flowContainer, oldFlowContainer }: {
    flowContainer: IContext;
    oldFlowContainer: IContext | null;
}): boolean;
export declare function detectedPropertyChanges({ newPropertyBlocks, oldPropertyBlocks }: {
    newPropertyBlocks: IBlock[];
    oldPropertyBlocks: IBlock[];
}): boolean;
export declare function detectedGroupChanges({ newGroupBlocks, oldGroupBlocks }: {
    newGroupBlocks: IBlock[];
    oldGroupBlocks: IBlock[];
}): boolean;
export declare function getPropertyBlocks(flowContainer: IContext): IBlock[];
export declare function getGroupBlocks(flowContainer: IContext): IBlock[];
