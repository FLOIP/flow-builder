import Lang from '@/lib/filters/lang';
declare type Upload = {
    progress: number;
    status: Map<string, number>;
};
declare const UploadMonitor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class UploadMonitor extends UploadMonitor_base {
    readonly uploadKey: string;
    uploadsById: Record<string, Upload>;
    uploadIdsByKey: Record<string, string>;
    get upload(): Upload | null;
    get hasProgress(): boolean;
    get isFailure(): boolean;
    get progress(): number;
    created(): void;
}
export default UploadMonitor;
