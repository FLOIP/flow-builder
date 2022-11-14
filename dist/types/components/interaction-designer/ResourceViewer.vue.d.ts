/// <reference types="lodash" />
import Lang from '../../lib/filters/lang';
export declare const DEBOUNCE_FLOW_PERSIST_MS = 1500;
declare const _default: {
    name: string;
    mixins: (typeof Lang)[];
    props: {
        filteredBlocks: {
            type: ArrayConstructor;
            default: () => any[];
        };
    };
    computed: {
        visibleBlocks(): any;
        id(): any;
        activeFlow: import("vuex").Computed;
    };
    mounted(): void;
    methods: {
        debounce_persistFlow: (() => any) & import("lodash").Cancelable;
        persistFlowAndHandleUiState: import("vuex").ActionMethod;
    };
};
export default _default;
