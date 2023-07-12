/// <reference types="lodash" />
import Lang from '../../lib/filters/lang';
declare const _default: {
    name: string;
    mixins: (typeof Lang)[];
    props: {
        visibleBlocks: {
            type: ArrayConstructor;
            default: () => any;
        };
    };
    computed: {
        id(): any;
        activeFlow: import("vuex/types/helpers").Computed;
    };
    mounted(): void;
    methods: {
        debounce_persistFlow: (() => any) & import("lodash").Cancelable;
        persistFlowAndHandleUiState: import("vuex/types/helpers").ActionMethod;
    };
};
export default _default;
