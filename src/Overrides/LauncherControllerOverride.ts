import { DependencyContainer } from "tsyringe";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LauncherController } from "@spt-aki/controllers/LauncherController";
import { CoopConfig } from "./../CoopConfig";
import { CoopGameController } from "src/Extentions/CoopGameController";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export class LauncherControllerOverride
{
    container: DependencyContainer;
    saveServer: SaveServer;
    coopGameController: CoopGameController;
    coopConfig: CoopConfig;
    httpConfig: any;
    logger:ILogger;
    
    constructor
    (
        container: DependencyContainer,
        coopConfig: CoopConfig,
        httpConfig: any
    )
    {
        this.container = container;
        this.saveServer = container.resolve<SaveServer>("SaveServer");
        this.coopGameController = container.resolve<CoopGameController>("CoopGameController");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.coopConfig = coopConfig;
        this.httpConfig = httpConfig;
    }

    private login(info: any)
    {
        let backendUrl: string = `${this.coopConfig.protocol}://${this.coopConfig.externalIP}:${this.httpConfig.port}`;
        
        for (const sessionID in this.saveServer.getProfiles())
        {
            const account = this.saveServer.getProfile(sessionID).info;
            
            if (info.username === account.username)
            {
                if(info.password === account.password)
                {
                    if(info.backendUrl !== undefined && info.backendUrl !== "")
                    {
                        backendUrl = info.backendUrl;
                    }

                    this.logger.info("login, Backend URL: " + backendUrl)
                    this.coopGameController.setSessionBackendUrl(sessionID, backendUrl);
                    
                    return sessionID;
                }
                else
                {
                    return "INVALID_PASSWORD";
                }
            }
        }

        return "";
    }

    public override(): void
    {
        this.container.afterResolution("LauncherController", (_t, result: LauncherController) => {

            // /launcher/profile/login
            result.login = (info: any) =>
            {
                return this.login(info);
            }
        }, {frequency: "Always"});
    }
}