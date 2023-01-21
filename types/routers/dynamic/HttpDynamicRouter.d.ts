import { DynamicRouter } from "../../di/Router";
import { ImageRouter } from "../ImageRouter";
export declare class HttpDynamicRouter extends DynamicRouter {
    protected imageRouter: ImageRouter;
    constructor(imageRouter: ImageRouter);
}
