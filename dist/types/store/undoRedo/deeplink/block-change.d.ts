export declare const BLOCK_CHANGE_REGEX: RegExp;
declare type BlockChangeParams = {
    flowIndex: number;
    blockIndex: number;
    fieldPath: string;
};
export declare function parseBlockChangeParams(key: string): BlockChangeParams | null;
export {};
