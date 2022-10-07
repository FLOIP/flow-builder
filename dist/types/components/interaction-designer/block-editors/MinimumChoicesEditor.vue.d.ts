import Lang from '../../../lib/filters/lang';
import { ISelectManyResponseBlock } from '@floip/flow-runner/src/model/block/ISelectManyResponseBlock';
import { IBlock } from '@floip/flow-runner';
declare const MinimumChoicesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MinimumChoicesEditor extends MinimumChoicesEditor_base {
    readonly block: ISelectManyResponseBlock;
    mounted(): void;
    get minChoices(): number | string;
    set minChoices(value: number | string);
    setMinChoices: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value?: number;
    }) => void;
}
export default MinimumChoicesEditor;
