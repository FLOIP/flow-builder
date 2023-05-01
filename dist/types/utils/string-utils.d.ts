/**
 * Snake case only non digit text
 * eg:
 *  - input: "01 a23 b45 c67c 89de"
 *  - output: "01_a23_b45_c67_c89_de"
 * @param value
 */
export declare function snakeCaseNonDigits(value?: string | null): string;
/**
 * Snake case on spaces only
 * eg:
 *  - 1message >>> 1message (no changes)
 *  - message_1 >>> message_1 (no changes)
 *  - message 1 >>> message_1 (with changes)
 * @param value
 * @param char
 */
export declare function snakeCaseOnSpaces(value?: string | null, char?: string): string;
