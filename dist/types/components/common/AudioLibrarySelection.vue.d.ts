import Lang from '../../lib/filters/lang';
import Moment from '../../lib/filters/moment';
import { IAudioFile } from '../interaction-designer/resource-editors';
declare const AudioLibrarySelection_base: import("vue-class-component/lib/declarations").VueClass<Lang & Moment>;
export declare class AudioLibrarySelection extends AudioLibrarySelection_base {
    audioFile: IAudioFile;
    selectable?: boolean;
    langId?: string;
    get audioFileUrl(): string;
    get audioFileDescription(): string;
    select(): void;
    clear(): void;
}
export default AudioLibrarySelection;
