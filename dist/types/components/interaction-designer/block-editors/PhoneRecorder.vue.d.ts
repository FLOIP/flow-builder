import { Vue } from 'vue-property-decorator';
import { Recorder } from '@/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue';
export declare class PhoneRecorder extends Vue {
    readonly recordingKey: string;
    callConfig: Partial<{
        recorder: Recorder;
        description: string;
    }>;
    handleRecorderSelectionChanged(): void;
    isRecorderSelectorVisible: boolean;
    isFeatureCallToRecordEnabled: boolean;
}
export default PhoneRecorder;
