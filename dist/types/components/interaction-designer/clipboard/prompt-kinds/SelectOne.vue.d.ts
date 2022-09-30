import Lang from '../../../../lib/filters/lang';
import { PromptKindMixin } from '../../../../components/interaction-designer/clipboard/shared/PromptKindMixin';
declare const SelectOne_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
export default class SelectOne extends SelectOne_base {
    selectedItem: string | null;
    options: {
        key: string;
        value: string;
    }[];
    backUpValue: string;
    mounted(): void;
    setOptions(): void;
    submitAnswer(): Promise<void>;
    editBlock(): void;
    onCancel(): void;
}
export {};
