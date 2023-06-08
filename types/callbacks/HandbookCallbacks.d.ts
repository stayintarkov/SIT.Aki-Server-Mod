import { HandbookController } from "../controllers/HandbookController";
import { OnLoad } from "../di/OnLoad";
export declare class HandbookCallbacks implements OnLoad {
    protected handbookController: HandbookController;
    constructor(handbookController: HandbookController);
    onLoad(): Promise<void>;
    getRoute(): string;
}
