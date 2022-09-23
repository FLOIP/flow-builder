import Lang from '@/lib/filters/lang';
declare const BlockActionButtons_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockActionButtons extends BlockActionButtons_base {
    readonly isFocused: boolean;
    readonly isDisabled: boolean;
    readonly onNextClicked: () => void;
    readonly isBlockInteraction: boolean;
    readonly onCancelClicked: () => void;
    get primaryButtonText(): string;
    clickCancel(): void;
}
export default BlockActionButtons;
