export declare const RESOURCE_CHANGE_REGEX: RegExp;
declare type ResourceChangeParams = {
    flowIndex: number;
    resourceIndex: number;
    fieldPath: string;
};
export declare function parseResourceChangeParams(key: string): ResourceChangeParams | null;
export {};
