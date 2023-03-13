import Lang from '../../lib/filters/lang';
import { IPositionLeftTop } from '../../lib/types';
declare const PlainDraggable_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class PlainDraggable extends PlainDraggable_base {
    startX?: number;
    startY?: number;
    isEditable: boolean;
    dragHandleId?: string;
    draggable: any;
    onToggleEditable(value: boolean): void;
    mounted(): void;
    destroyed(): void;
    handleInitialized(): void;
    handleDragged(position: IPositionLeftTop): void;
    handleDragStarted(position: IPositionLeftTop): void;
    handleDragEnded(position: IPositionLeftTop): void;
}
export default PlainDraggable;
