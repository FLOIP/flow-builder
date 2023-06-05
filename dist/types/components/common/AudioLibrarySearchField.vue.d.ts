import { IAudioFile } from '../interaction-designer/resource-editors';
declare const AudioLibrarySearchField_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class AudioLibrarySearchField extends AudioLibrarySearchField_base {
    readonly langId?: string;
    readonly audioFiles: IAudioFile[];
    isActive: boolean;
    rawQuery: string;
    cache: Record<string, IAudioFile[]>;
    isEntireLibraryModeEnabled: boolean;
    offset: number;
    limit: number;
    get query(): string;
    get isAudioLibraryEmpty(): boolean;
    get hasNext(): boolean;
    get hasPrevious(): boolean;
    search(query: string): IAudioFile[];
    incrementPage(): void;
    decrementPage(): void;
    resetPagination(): void;
    toggleAudioLibrary(): void;
    select(audio: IAudioFile): void;
    activate(): void;
    deactivate(): void;
}
export default AudioLibrarySearchField;
