import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
import { IBlock, IFlow, ILanguage, IResource, IResourceValue, SupportedContentType, SupportedMode } from '@floip/flow-runner';
import { IAudioFile, IResourceDefinitionVariantOverModesWithOptionalValue } from '../../../components/interaction-designer/resource-editors/ResourceEditor.model';
declare const ResourceEditorCell_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class ResourceEditorCell extends ResourceEditorCell_base {
    block: IBlock;
    contentType: string;
    languageId: string;
    mode: SupportedMode;
    SupportedContentType: typeof SupportedContentType;
    availableAudioFiles: IAudioFile[];
    isFeatureAudioUploadEnabled: boolean;
    pushAudioIntoLibrary: (audio: IAudioFile) => void;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    activeFlow: IFlow;
    resource_setOrCreateValueModeSpecific: ({ resourceId, filter, value, }: {
        resourceId: IResource['uuid'];
        filter: IResourceDefinitionVariantOverModesWithOptionalValue;
        value: string;
    }) => void;
    isEditable: boolean;
    get resource(): IResource;
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
    get resourceVariant(): IResourceValue;
    get index(): number;
}
export default ResourceEditorCell;
