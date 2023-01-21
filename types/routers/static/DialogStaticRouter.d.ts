import { DialogueCallbacks } from "../../callbacks/DialogueCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class DialogStaticRouter extends StaticRouter {
    protected dialogueCallbacks: DialogueCallbacks;
    constructor(dialogueCallbacks: DialogueCallbacks);
}
