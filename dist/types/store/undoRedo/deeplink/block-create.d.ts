export declare const BLOCK_CREATE_REGEX: RegExp;
declare type BlockCreateParams = {
    flowIndex: number;
    blockIndex: number;
};
export declare function parseBlockCreateParams(key: string): BlockCreateParams | null;
export {};
