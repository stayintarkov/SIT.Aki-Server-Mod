import { DynamicRouter, RouteAction } from "../../../di/Router";
export declare class DynamicRouterMod extends DynamicRouter {
    private topLevelRoute;
    constructor(routes: RouteAction[], topLevelRoute: string);
    getTopLevelRoute(): string;
}
