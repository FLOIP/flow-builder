import { IBlock, IFlow, ILanguage } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
declare const PerLanguageResourceEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerLanguageResourceEditor extends PerLanguageResourceEditor_base {
    block: IBlock;
    activeFlow: IFlow;
    get languages(): ILanguage[];
}
export default PerLanguageResourceEditor;
