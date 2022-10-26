import { findOrGenerateStubbedVariantOn } from '../../../../store/flow/utils/resourceHelpers';
import Lang from '../../../../lib/filters/lang';
import { IBlock, IFlow, IResource, IResourceValue, SupportedContentType, SupportedMode } from '@floip/flow-runner';
import { ISelectOneResponseBlock } from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock';
import Vue from 'vue';
declare const ChoicesBuilder_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ChoicesBuilder extends ChoicesBuilder_base {
    readonly block: ISelectOneResponseBlock;
    draftResource: IResource | null;
    SupportedContentType: typeof SupportedContentType;
    SupportedMode: typeof SupportedMode;
    findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
    get choiceResourcesOrderedByResourcesList(): IResource[];
    created(): void;
    generateDraftResource(): Promise<void>;
    addDraftResourceToChoices(): Promise<void>;
    focusInputElFor(editor?: Vue): void;
    choice_create: ({ blockId, resourceId, value }: {
        blockId: IBlock['uuid'];
        resourceId: IResource['uuid'];
        value: string;
    }) => void;
    choice_change: ({ blockId, resourceId, value }: {
        blockId: IBlock['uuid'];
        resourceId: IResource['uuid'];
        value: IResourceValue['value'];
    }) => void;
    handleExistingResourceVariantChangedFor({ choiceIndex }: {
        choiceIndex: number;
    }, { variant, resourceId, value }: {
        variant: IResourceValue;
        resourceId: IResource['uuid'];
        value: IResourceValue['value'];
    }): void;
    handleNewChoiceChange({ variant, resourceId, value }: {
        variant: IResourceValue;
        resourceId: IResource['uuid'];
        value: string;
    }): void;
    choiceMimeType: string;
    activeFlow: IFlow;
    resource_add: ({ resource }: {
        resource: IResource;
    }) => void;
    resource_createWith: ({ props }: {
        props: {
            uuid: string;
        } & Partial<IResource>;
    }) => Promise<IResource>;
    deleteChoiceByResourceIdFrom: ({ blockId, resourceId }: {
        blockId: IBlock['uuid'];
        resourceId: IResource['uuid'];
    }) => void;
    block_setChoiceIvrExpressionOnIndex: ({ blockId, index, value }: {
        blockId: string;
        index: number;
        value: string;
    }) => void;
    addChoiceByResourceIdTo: ({ blockId, resourceId }: {
        blockId: IBlock['uuid'];
        resourceId: IResource['uuid'];
    }) => void;
}
export default ChoicesBuilder;
