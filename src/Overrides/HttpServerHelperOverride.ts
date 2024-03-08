import { DependencyContainer } from "tsyringe";
import { CoopConfig } from "./../CoopConfig";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";

export class HttpServerHelperOverride {
    container: DependencyContainer;

    httpServerHelper: HttpServerHelper;
    
    constructor
    (
        container: DependencyContainer
    )
    {
        this.container = container;
        this.httpServerHelper = container.resolve<HttpServerHelper>("HttpServerHelper");
    }

    public getWebsocketUrl(): string {
        const originalUrl = this.httpServerHelper.buildUrl();
        console.log(`Original Message WS Url is ${originalUrl}`);
        if (CoopConfig.Instance.useMessageWSUrlOverride) {
            console.log(`Override Message WS Url to ${CoopConfig.Instance.messageWSUrlOverride}`);
            return `ws://${CoopConfig.Instance.messageWSUrlOverride}`;
        } else {
            return `ws://${originalUrl}`;
        }
    }

    public override(): void 
    {
        this.container.afterResolution("HttpServerHelper", (_t, result: HttpServerHelper) => 
        {
            // We want to replace the original method logic with something different
            result.getWebsocketUrl = () => 
            {
                return this.getWebsocketUrl();
            }
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, {frequency: "Always"});
    }
}
