import { DependencyContainer } from "tsyringe";
import { ILoginRequestData } from "@spt-aki/models/eft/launcher/ILoginRequestData";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { LauncherController } from "@spt-aki/controllers/LauncherController";
import { CoopConfig } from "src/CoopConfig";
import { GameControllerOverride } from "./GameControllerOverride";

export class LauncherControllerOverride
{
    container: DependencyContainer;
    saveServer: SaveServer;
    gameControllerOverride: GameControllerOverride;
    coopConfig: CoopConfig;
    httpConfig: any;
    
    constructor
    (
        container: DependencyContainer,
        gameControllerOverride: GameControllerOverride,
        coopConfig: CoopConfig,
        httpConfig: any
    )
    {
        this.container = container;
        this.saveServer = container.resolve<SaveServer>("SaveServer");
        this.gameControllerOverride = gameControllerOverride;
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

                    this.gameControllerOverride.setSessionBackendUrl(sessionID, backendUrl);
                    
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