import Vue from 'vue';
export declare function interpolateRouteWith(context: any, route?: any): any;
export declare function routeFrom(routeKey: string, context: any, routes: any): any;
export default class Routes extends Vue {
    routes: any;
    route(routeKey: string, context: any): any;
}
