import Lang from '../lib/filters/lang';
import Routes from '../lib/mixins/Routes';
import { IFlow } from '@floip/flow-runner';
declare const Home_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
declare class Home extends Home_base {
    readonly appConfig: object;
    readonly builderConfig: object;
    isExtraContentHidden: boolean;
    showExtraContent(e: KeyboardEvent): void;
    hideExtraContent(e: KeyboardEvent): void;
    flows: IFlow[];
    configure: ({ appConfig, builderConfig }: {
        appConfig: object;
        builderConfig: object;
    }) => void;
    isConfigured: boolean;
    beforeCreate(): Promise<void>;
    created(): Promise<void>;
}
export default Home;
