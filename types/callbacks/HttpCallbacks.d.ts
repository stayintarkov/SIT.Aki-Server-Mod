import { OnLoad } from "../di/OnLoad";
import { HttpServer } from "../servers/HttpServer";
export declare class HttpCallbacks implements OnLoad {
    protected httpServer: HttpServer;
    constructor(httpServer: HttpServer);
    onLoad(): Promise<void>;
    getRoute(): string;
    getImage(): string;
}
