import { IBlock } from '@floip/flow-runner';
import { IExpressionContext, ISuggestion } from '../types';
export interface ISuggestionsContext {
    blocks: IBlock[];
}
export declare function getSuggestions(context: IExpressionContext): ISuggestion[];
