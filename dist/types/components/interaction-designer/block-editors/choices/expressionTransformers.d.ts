import { IChoice } from '@floip/flow-runner';
export declare function escapeQuotes(value: string): string;
export declare function unescapeQuotes(value: string): string;
export declare function choicesToExpression(choices: IChoice[], propertyValueMapping: Record<string, string | number>): string;
export declare function testExpressionToChoice(expression: string): string;
export declare function choiceToTestExpression(value: string): string;
