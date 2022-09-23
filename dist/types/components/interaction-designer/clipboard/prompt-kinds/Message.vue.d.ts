import Lang from '../../../../lib/filters/lang';
import { PromptKindMixin } from '../../../../components/interaction-designer/clipboard/shared/PromptKindMixin';
declare const Message_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
export default class Message extends Message_base {
    submitAnswer(): Promise<void>;
}
export {};
