/// <reference types="lodash" />
import { Vue } from 'vue-property-decorator';
import { IBlock, IFlow } from '@floip/flow-runner';
export declare class BuilderCanvas extends Vue {
    block: IBlock;
    widthAdjustment: number;
    onCanvasHeightChanged(newValue: number): void;
    onCanvasWidthChanged(newValue: number): void;
    debounceVerticalScroll: ((this: any) => void) & import("lodash").Cancelable;
    debounceHorizontalScroll: ((this: any) => void) & import("lodash").Cancelable;
    get blockHeight(): number;
    get blockWidth(): number;
    get blockAtTheLowestPosition(): any;
    get blockAtTheFurthestRightPosition(): any;
    get windowHeight(): number;
    get windowWidth(): number;
    get canvasHeight(): any;
    get canvasWidth(): number;
    get visibleBlockEditorWidth(): number;
    flows?: IFlow[];
    activeFlow: IFlow;
    isBlockEditorOpen: boolean;
}
export default BuilderCanvas;
