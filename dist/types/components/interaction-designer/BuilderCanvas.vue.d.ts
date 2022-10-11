/// <reference types="lodash" />
import { Vue } from 'vue-property-decorator';
import { IBlock, IFlow, ILanguage, IResource, SupportedMode } from '@floip/flow-runner';
import { IValidationStatus } from '../../store/validation';
export declare class BuilderCanvas extends Vue {
    block: IBlock;
    widthAdjustment: number;
    onActiveFlowChanged(newFlow: IFlow): Promise<void>;
    debounceFlowValidation: ((this: any, { newFlow }: {
        newFlow: IFlow;
    }) => Promise<void>) & import("lodash").Cancelable;
    onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]): Promise<void>;
    debounceBlockValidation: ((this: any) => void) & import("lodash").Cancelable;
    onCanvasHeightChanged(newValue: number): void;
    onCanvasWidthChanged(newValue: number): void;
    debounceVerticalScroll: ((this: any) => void) & import("lodash").Cancelable;
    debounceHorizontalScroll: ((this: any) => void) & import("lodash").Cancelable;
    get blocksOnActiveFlowForWatcher(): IBlock[];
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
    validate_flow: ({ flow }: {
        flow: IFlow;
    }) => Promise<IValidationStatus>;
    validate_allBlocksWithinFlow: () => Promise<void>;
    validate_resourcesOnSupportedValues: ({ resources, supportedModes, supportedLanguages }: {
        resources: IResource[];
        supportedModes: SupportedMode[];
        supportedLanguages: ILanguage[];
    }) => Promise<void>;
}
export default BuilderCanvas;
