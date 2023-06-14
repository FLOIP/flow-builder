import { Location } from 'vue-router';
import { IFlowsState } from '../../../store/flow';
/**
 * Returns a route name & params for navigation when undoing-redoing user's commands.
 * Returns null values for unsupported commands.
 * Supported commands: create block, change block, change resource.
 * @param changedKeys
 * @param flows
 */
export declare function getDeepLink({ changedKeys, flows }: {
    changedKeys: string[];
    flows: IFlowsState;
}): DeepLink;
declare type DeepLink = {
    routeName: Location['name'];
    routeParams: Location['params'];
} | {
    routeName: null;
    routeParams: null;
};
export {};
