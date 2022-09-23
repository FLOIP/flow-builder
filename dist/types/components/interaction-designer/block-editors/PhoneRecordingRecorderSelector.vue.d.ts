export declare type Recorder = {
    name: string | null;
    phone: string | null;
    isNew: boolean;
} | null;
declare const PhoneRecordingRecorderSelector_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class PhoneRecordingRecorderSelector extends PhoneRecordingRecorderSelector_base {
    readonly isModalVisible: boolean;
    description: any;
    draft: Recorder;
    selectedRecorder: Recorder;
    created(): void;
    selectNewRecorder(): void;
    setSelectedRecorder(recorder: Recorder): void;
    reset(): void;
    handleModalClosed(): void;
    handleModalCancelled(): void;
    recorders: unknown;
}
export default PhoneRecordingRecorderSelector;
