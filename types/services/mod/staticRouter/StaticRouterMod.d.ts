import { RouteAction, StaticRouter } from "../../../di/Router";
export declare class StaticRouterMod extends StaticRouter {
    private topLevelRoute;
    constructor(routes: RouteAction[], topLevelRoute: string);
    getTopLevelRoute(): string;
}
