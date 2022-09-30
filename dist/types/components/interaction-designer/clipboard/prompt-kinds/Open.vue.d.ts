import Lang from '../../../../lib/filters/lang';
import { PromptKindMixin } from '../../../../components/interaction-designer/clipboard/shared/PromptKindMixin';
declare const Open_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
export default class Open extends Open_base {
    enteredValue: string;
    backUpValue: string;
    submitAnswer(): Promise<void>;
    editBlock(): void;
    onCancel(): void;
}
export {};
