import { IExpressionContext, ISuggestion, ISuggestionValue } from '../types';
export declare type SuggestionValueOrString = ISuggestionValue | string;
export declare function merge(suggestions: ISuggestion[]): ISuggestion[];
export declare function getBlockNames(context: IExpressionContext): string[];
