import Lang from '../../lib/filters/lang';
import { IIndexedString } from '../../store/validation';
declare const ValidationMessage_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ValidationMessage extends ValidationMessage_base {
    messageKey: string;
    shouldHideValidation: boolean;
    readonly overrides?: Record<string, string>;
    get errorMessage(): string;
    get messageOverrides(): Map<string, string>;
    get isValid(): boolean;
    flattenErrorMessages: IIndexedString;
}
export default ValidationMessage;
