import Lang from '../../../lib/filters/lang';
import { IResource, IResourceValue } from '@floip/flow-runner';
import { SupportedMode } from '@floip/flow-runner/src/flow-spec/SupportedMode';
declare const ResourceVariantTextEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ResourceVariantTextEditor extends ResourceVariantTextEditor_base {
    readonly index: number;
    readonly resourceId: IResource['uuid'];
    readonly label: string;
    readonly prependText: string;
    readonly placeholder: string;
    readonly resourceVariant: IResourceValue;
    readonly mode: SupportedMode;
    readonly rows: number;
    readonly disabledAutoComplete: boolean;
    get defaultPlaceholder(): string;
    get content(): string;
    get contentLengthInfo(): string;
    commitExpressionChange(value: string): void;
    get isSms(): boolean;
    get isUssd(): boolean;
    resource_setOrCreateValueModeSpecific: ({ resourceId, filter, value }: {
        resourceId: IResource['uuid'];
        filter: {};
        value: string;
    }) => void;
}
export default ResourceVariantTextEditor;
