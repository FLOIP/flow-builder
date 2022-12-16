import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
import { IBlock, IFlow, ILanguage, IResource } from '@floip/flow-runner';
import { discoverContentTypesFor } from '../../../store/flow/utils/resourceHelpers';
declare const PerModeResourceEditorRow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerModeResourceEditorRow extends PerModeResourceEditorRow_base {
    block: IBlock;
    mode: string;
    discoverContentTypesFor: typeof discoverContentTypesFor;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    activeFlow: IFlow;
    get resource(): IResource;
    get languages(): ILanguage[];
}
export default PerModeResourceEditorRow;
