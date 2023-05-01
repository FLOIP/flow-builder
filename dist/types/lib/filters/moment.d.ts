import { DurationInputArg1, DurationInputArg2, MomentInput } from 'moment';
import { Vue } from 'vue-property-decorator';
export declare function formatDate(date: MomentInput, format?: string): string;
export declare function fromNow(date: MomentInput, withoutSuffix?: boolean): string;
export declare function formatDuration(duration: DurationInputArg1, unit?: DurationInputArg2, withSuffix?: boolean): string;
export declare function formatDurationLocalized(duration: DurationInputArg1, locale: string, unit?: DurationInputArg2, withSuffix?: boolean): string;
export declare class Moment extends Vue {
}
export default Moment;
