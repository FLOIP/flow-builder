import Lang from '../../lib/filters/lang';
import { IBlockExtended } from '../../lib/types';
declare const HorizontalBlockContentEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class HorizontalBlockContentEditor extends HorizontalBlockContentEditor_base {
    alternateAudioFileSelections: unknown;
    tree: unknown;
    block: IBlockExtended;
    enabledLanguages: string[];
    languageNames: Record<string, string>;
    isEditable: boolean;
    audioFiles: unknown;
    debouncedSaveTree: () => void;
    constructor();
    selectAudioFileFor({ langId, value }: {
        langId: string;
        value: boolean;
    }): void;
    toggleReviewedStateFor(langId: string): void;
}
export default HorizontalBlockContentEditor;
