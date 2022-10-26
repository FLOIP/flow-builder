import { IBlock, ILanguage } from '@floip/flow-runner';
import { IAudioFile } from '../components/interaction-designer/resource-editors';
export interface IBlockExtended extends IBlock {
    jsKey: string;
    customData: IBlockCustomData;
    audioFiles: Record<ILanguage['id'], string>;
    smsContent: Record<ILanguage['id'], string>;
    ussdContent: Record<ILanguage['id'], string>;
}
export interface IBlockCustomData {
    title: string;
    repeatKey: number;
    repeatMax: number;
    repeatDelay: number;
    repeat: boolean;
    reviewed?: Record<string, boolean>;
    approved?: Record<string, boolean>;
}
export interface IAudioFileSelection {
    value: IAudioFile;
    langId: ILanguage['id'];
}
export interface IExpressionContext {
    blocks: IBlock[];
    subscriberPropertyFields: ISubscriberPropertyField[];
}
export interface ISuggestionValue {
    value: string;
    focusText: Number[];
}
export interface ISuggestion {
    trigger: string;
    values: (ISuggestionValue | string)[];
}
export interface ISubscriberPropertyField {
    id: string;
    name: string;
    display_label: string;
}
export interface IPositionLeftTop {
    left: number;
    top: number;
}
export declare type BlockClasses = string[];
