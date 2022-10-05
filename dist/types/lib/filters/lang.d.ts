import Vue from 'vue';
declare class Lang extends Vue {
    trans(translation: string, interpolations?: object): any;
    static trans(translation: string, interpolations?: object): any;
    /**
     * `transIf(condition, ...)` should only be used when we encounter an issue with `:disabled="!condition"` approach
     * eg: for v-b-tooltip, we may need to remove completely the tooltip on block view mode
     */
    transIf(condition: boolean, translation: string): any;
}
export default Lang;
export declare const lang: typeof Lang;
