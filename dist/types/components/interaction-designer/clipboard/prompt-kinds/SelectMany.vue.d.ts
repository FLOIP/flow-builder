import Lang from '@/lib/filters/lang';
import { PromptKindMixin } from '@/components/interaction-designer/clipboard/shared/PromptKindMixin';
declare const SelectMany_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
export default class SelectMany extends SelectMany_base {
    selectedChoices: string[];
    options: {
        key: string;
        value: string;
    }[];
    backUpValue: any[];
    mounted(): void;
    setOptions(): void;
    submitAnswer(): Promise<void>;
    editBlock(): void;
    onCancel(): void;
}
export {};
