import { IBlock, IBlockExit } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
import { IConnectionContext } from '@/store/builder';
export declare const colorStates: {
    ON_HOVER: string;
    CONNECTING: string;
    DEFAULT: string;
};
interface ILeaderLineOptions {
    color: string;
    endPlugColor?: string;
    endPlugSize: number;
    endSocket: string;
    gradient?: true;
    outline?: boolean;
    outlineColor?: string;
    path: string;
    size: number;
    startPlug: string;
    startPlugColor?: string;
    startSocket: string;
}
declare const Connection_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Connection extends Connection_base {
    readonly exit: IBlockExit;
    readonly repaintCacheKeyGenerator: Function;
    readonly source: IBlock;
    readonly target: IBlock;
    readonly position: {
        x: number;
        y: number;
    };
    readonly color: string;
    line: any;
    isPermanentlyActive: boolean;
    get hasDestination(): Boolean;
    /**
     * these options come from the Leader-line doc: https://anseki.github.io/leader-line/#options
     */
    get options(): ILeaderLineOptions;
    get onHoverOptions(): Partial<ILeaderLineOptions>;
    get connectionContext(): IConnectionContext;
    get sourceElementId(): string;
    get targetElementId(): string;
    get repositionHook(): string | null;
    mounted(): void;
    beforeDestroy(): void;
    activateConnection: ({ connectionContext }: {
        connectionContext: IConnectionContext;
    }) => void;
    deactivateConnection: ({ connectionContext }: {
        connectionContext: IConnectionContext;
    }) => void;
    activateBlock: ({ blockId }: {
        blockId: IBlock['uuid'] | null;
    }) => void;
    reposition(): void;
    mouseOverHandler(): void;
    mouseOutHandler(): void;
    clickHandler(): void;
    clickAwayHandler(connectionElement: Element, event: Event): void;
}
export default Connection;
