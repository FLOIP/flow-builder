import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import { discoverContentTypesFor } from '../../../store/flow/resource';
declare const PerModeResourceEditorRow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerModeResourceEditorRow extends PerModeResourceEditorRow_base {
    block: IBlock;
    modeIndex: string;
    mode: string;
    discoverContentTypesFor: typeof discoverContentTypesFor;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    activeFlow: IFlow;
    get resource(): IResource;
}
export default PerModeResourceEditorRow;
