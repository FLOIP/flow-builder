import Vue from 'vue';
import { IContext, IPrompt } from '@floip/flow-runner';
export declare class PromptKindMixin extends Vue {
    index: number;
    isComplete: boolean;
    goNext: Function;
    onEditComplete: Function;
    context: IContext;
    errorMsg: string | null;
    isBlockInteraction: boolean;
    get isFocused(): boolean;
    get prompt(): IPrompt<any>;
    checkIsValid(value: unknown): void;
    submitAnswerCommon(value: unknown): Promise<void>;
    editBlockCommon(): void;
    onCancelCommon(): void;
    isBlockFocused: (index: number) => boolean;
    getBlockPrompt: (index: number) => IPrompt<any>;
    setIsFocused: (data: {
        index: number;
        value: boolean;
    }) => void;
    setLastBlockUnEditable: () => void;
    setLastBlockEditable: () => void;
}
