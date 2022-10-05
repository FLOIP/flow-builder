import { IChoice } from '@floip/flow-runner';
export declare function escapeQuotes(value: string): string;
export declare function choicesToExpression(choices: IChoice[], propertyValueMapping: Record<string, string | number>): string;
