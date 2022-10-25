import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
import { IBlock, IResource, SupportedContentType, SupportedMode } from '@floip/flow-runner';
import { discoverContentTypesFor } from '../../../store/flow/utils/resourceHelpers';
declare const PerLanguageResourceEditorRow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerLanguageResourceEditorRow extends PerLanguageResourceEditorRow_base {
    block: IBlock;
    languageIndex: string;
    languageId: string;
    SupportedMode: typeof SupportedMode;
    SupportedContentType: typeof SupportedContentType;
    iconsMap: Map<string, object>;
    discoverContentTypesFor: typeof discoverContentTypesFor;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    supportedModeWithOrderInfo: {
        mode: SupportedMode;
        index: number;
        order: number;
    }[];
    get resource(): IResource;
}
export default PerLanguageResourceEditorRow;
