import { IBlock } from '@floip/flow-runner';
import { PropType } from 'vue';
declare const _default: {
    name: string;
    props: {
        block: PropType<IBlock<import("@floip/flow-runner").IBlockConfig>>;
    };
    mixins: typeof import("../../../lib/filters/lang").default[];
    computed: {
        blockLabel(): any;
        hasContent(): boolean;
        isEditable: import("vuex").Computed;
        block_classesConfig: import("vuex").Computed;
    };
};
export default _default;
