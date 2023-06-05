export declare const MarkdownView: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    markdown: {
        type: StringConstructor;
        required: true;
    };
}, {}, {}, {
    html(): string;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    markdown: {
        type: StringConstructor;
        required: true;
    };
}>>, {
    tag: string;
}>;
export default MarkdownView;
