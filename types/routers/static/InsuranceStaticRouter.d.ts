import { InsuranceCallbacks } from "../../callbacks/InsuranceCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class InsuranceStaticRouter extends StaticRouter {
    protected insuranceCallbacks: InsuranceCallbacks;
    constructor(insuranceCallbacks: InsuranceCallbacks);
}
