import { IBlockExit } from '@floip/flow-runner';
declare const ExitSemanticLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class ExitSemanticLabelEditor extends ExitSemanticLabelEditor_base {
    readonly isEditable: boolean;
    readonly exit: IBlockExit;
    get semanticLabel(): string;
    set semanticLabel(value: string);
}
export default ExitSemanticLabelEditor;
