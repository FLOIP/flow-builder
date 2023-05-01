import { IBlock, IBlockExit } from '@floip/flow-runner';
declare const _default: import("vue/types/v3-component-public-instance").ComponentPublicInstanceConstructor<import("vue/types/v3-component-public-instance").Vue3Instance<{}, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    block: IBlock;
    exit: IBlockExit;
}>>>, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    block: IBlock;
    exit: IBlockExit;
}>>>, {
    "connection-create-start": () => void;
} & {
    "connection-create-end": () => void;
}, {}, true, import("vue/types/v3-component-options").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>> & Readonly<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    block: IBlock;
    exit: IBlockExit;
}>>>> & import("vue").ShallowUnwrapRef<{}> & import("vue/types/v3-component-options").ExtractComputedReturns<{}> & import("vue").ComponentCustomProperties & Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    block: IBlock;
    exit: IBlockExit;
}>>>, any, any, any, import("vue").ComponentComputedOptions, import("vue").ComponentMethodOptions> & import("vue/types/v3-component-options").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    block: IBlock;
    exit: IBlockExit;
}>>>, {}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {
    "connection-create-start": () => void;
} & {
    "connection-create-end": () => void;
}, string, {}> & {
    props: __VLS_TypePropsToRuntimeProps<{
        block: IBlock;
        exit: IBlockExit;
    }>;
} & (new () => {
    $slots: {};
});
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
