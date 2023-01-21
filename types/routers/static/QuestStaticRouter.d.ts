import { QuestCallbacks } from "../../callbacks/QuestCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class QuestStaticRouter extends StaticRouter {
    protected questCallbacks: QuestCallbacks;
    constructor(questCallbacks: QuestCallbacks);
}
