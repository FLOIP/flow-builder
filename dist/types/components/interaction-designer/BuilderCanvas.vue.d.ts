import { Vue } from 'vue-property-decorator';
import { IBlock, IFlow, IResources } from '@floip/flow-runner';
export declare class BuilderCanvas extends Vue {
    block: IBlock;
    widthAdjustment: number;
    onActiveFlowChanged(newFlow: IFlow): Promise<void>;
    debounceFlowValidation: ((this: any, { newFlow }: {
        newFlow: IFlow;
    }) => void) & import("lodash").Cancelable;
    onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]): Promise<void>;
    debounceBlockValidation: ((this: any) => void) & import("lodash").Cancelable;
    onResourcesOnActiveFlowChanged(newResources: IResources, oldResources: IResources): Promise<void>;
    onCanvasHeightChanged(newValue: number): void;
    onCanvasWidthChanged(newValue: number): void;
    debounceVerticalScroll: ((this: any) => void) & import("lodash").Cancelable;
    debounceHorizontalScroll: ((this: any) => void) & import("lodash").Cancelable;
    get blocksOnActiveFlowForWatcher(): IBlock[];
    get blockHeight(): number;
}
