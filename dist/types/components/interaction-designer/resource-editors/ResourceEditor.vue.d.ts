import { IBlock, IFlow, IResource, IResourceValue as IResourceDefinitionVariantOverModes, SupportedContentType, SupportedMode } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
import Permissions from '@/lib/mixins/Permissions';
import Routes from '@/lib/mixins/Routes';
import FlowUploader from '@/lib/mixins/FlowUploader';
import { discoverContentTypesFor, findOrGenerateStubbedVariantOn, findResourceVariantOverModesOn, IResourceDefinitionVariantOverModesFilter } from '@/store/flow/resource';
import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
export interface IAudioFile {
    id: string;
    audio_uuid: string;
    description: string;
    language_id: string;
    duration_seconds: string;
    original_extension: string;
    created_at: string;
    uri: string;
}
interface IResourceDefinitionVariantOverModesWithOptionalValue extends Partial<IResourceDefinitionVariantOverModes> {
    value?: IResourceDefinitionVariantOverModes['value'];
}
declare const ResourceEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class ResourceEditor extends ResourceEditor_base {
    block: IBlock;
    flow: IFlow;
    resource: IResource;
    label?: string | number;
    discoverContentTypesFor: typeof discoverContentTypesFor;
    findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
    findResourceVariantOverModesOn: typeof findResourceVariantOverModesOn;
    SupportedMode: typeof SupportedMode;
    SupportedContentType: typeof SupportedContentType;
    iconsMap: Map<string, object>;
    triggerRecordViaPhoneFor(langId: ILanguage['id']): void;
    handleFilesSubmittedFor(key: string, { data }: {
        data: any;
    }): void;
    /**
     * handleFileSuccessFor
     * @param key
     * @param langId
     * @param event, schema: {data: {file, uploader, json}}
     */
    handleFileSuccessFor(key: string, langId: ILanguage['id'], event: any): void;
    /**
     * handleFileErrorFor
     * @param event, schema: {data: {file, message, uploader}}
     */
    handleFileErrorFor(event: any): void;
    findAudioResourceVariantFor(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): string | null;
    /**
     * Compute resource index (cell index) for a table having X languages and Y modes
     *
     * @param langIndex
     * @param modeIndex
     */
    computeResourceIndex(langIndex: number, modeIndex: number): number;
    availableAudioFiles: IAudioFile[];
    isFeatureAudioUploadEnabled: boolean;
    pushAudioIntoLibrary: (audio: IAudioFile) => void;
    resource_setOrCreateValueModeSpecific: ({ resourceId, filter, value, }: {
        resourceId: IResource['uuid'];
        filter: IResourceDefinitionVariantOverModesWithOptionalValue;
        value: string;
    }) => void;
    isEditable: boolean;
}
export default ResourceEditor;
