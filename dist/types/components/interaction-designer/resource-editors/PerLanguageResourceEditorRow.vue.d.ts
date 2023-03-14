import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
import { IBlock, IFlow, IResource, SupportedMode } from '@floip/flow-runner';
import { discoverContentTypesFor } from '../../../store/flow/utils/resourceHelpers';
declare const PerLanguageResourceEditorRow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerLanguageResourceEditorRow extends PerLanguageResourceEditorRow_base {
    block: IBlock;
    languageId: string;
    iconsMap: Map<string, object>;
    discoverContentTypesFor: typeof discoverContentTypesFor;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    activeFlow: IFlow;
    get resource(): IResource;
    get modes(): SupportedMode[];
}
export default PerLanguageResourceEditorRow;
