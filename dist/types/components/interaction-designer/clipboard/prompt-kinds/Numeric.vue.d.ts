import Lang from '@/lib/filters/lang';
import { PromptKindMixin } from '@/components/interaction-designer/clipboard/shared/PromptKindMixin';
declare const Numeric_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
export default class Numeric extends Numeric_base {
    enteredValue: string;
    backUpValue: string;
    submitAnswer(): Promise<void>;
    editBlock(): void;
    onCancel(): void;
}
export {};
