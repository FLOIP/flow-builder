import { IBlock, IResource } from '@floip/flow-runner';
export declare function findBlockRelatedResourcesUuids({ block }: {
    block: IBlock;
}): IResource['uuid'][];
