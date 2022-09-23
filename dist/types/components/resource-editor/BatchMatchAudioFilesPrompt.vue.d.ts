import { IBatchMatchAudioData } from '@/lib/types';
declare const BatchMatchAudioFilesPrompt_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class BatchMatchAudioFilesPrompt extends BatchMatchAudioFilesPrompt_base {
    readonly focus: boolean;
    readonly data: IBatchMatchAudioData;
    readonly isAudioLibraryEmpty?: boolean;
    pattern: string;
    replaceExisting: boolean;
    expanded: boolean;
    get disabled(): boolean;
    get isValid(): boolean;
    cancel(): void;
    confirm(): void;
    toggleExpanded(): void;
}
export default BatchMatchAudioFilesPrompt;
