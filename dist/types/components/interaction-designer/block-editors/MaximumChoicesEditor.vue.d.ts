import { ISelectManyResponseBlock } from '@floip/flow-runner/src/model/block/ISelectManyResponseBlock';
import { IBlock } from '@floip/flow-runner';
declare const MaximumChoicesEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class MaximumChoicesEditor extends MaximumChoicesEditor_base {
    readonly block: ISelectManyResponseBlock;
    mounted(): void;
    get maxChoices(): number | string;
    set maxChoices(value: number | string);
    setMaxChoices: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value?: number;
    }) => void;
}
export default MaximumChoicesEditor;
