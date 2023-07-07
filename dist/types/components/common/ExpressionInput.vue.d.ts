import '@avcs/autosuggest/dropdown.css';
import Lang from '../../lib/filters/lang';
import { IFlow } from '@floip/flow-runner';
import { ISubscriberPropertyField, ISuggestion } from '../../lib/types';
interface IAutoSuggest {
    dropdown: {
        dropdown: HTMLDivElement;
        dropdownContent: HTMLUListElement;
    };
}
declare const ExpressionInput_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ExpressionInput extends ExpressionInput_base {
    readonly label: string | number;
    readonly labelClass: string;
    readonly placeholder: string;
    readonly currentExpression?: string;
    readonly expressionIdentifier: string | number | null;
    readonly rows: number;
    readonly validState: boolean | null;
    readonly prependText: string;
    readonly disabled: boolean;
    readonly disabledAutoComplete: boolean;
    suggest: IAutoSuggest;
    get autoSuggestDropdown(): HTMLElement;
    get refAutoSuggestElement(): HTMLElement;
    get refInputElement(): HTMLInputElement;
    get isInvalid(): boolean;
    get expression(): string | undefined;
    set expression(value: string | undefined);
    get suggestions(): ISuggestion[];
    /**
     * Making sure we port the auto-suggest under desired dom
     */
    portAutoSuggestContent(): void;
    /**
     * Delay the portal to make sure AutoSuggest has finished the update.
     */
    debounce_portAutoSuggestContent(): void;
    handleClick(): void;
    mounted(): void;
    updated(): void;
    focus(): void;
    activeFlow?: IFlow;
    subscriberPropertyFields: ISubscriberPropertyField[];
}
export default ExpressionInput;
