import { DependencyContainer } from "tsyringe";
import { GameController } from "@spt-aki/controllers/GameController";
import { IGameConfigResponse } from "@spt-aki/models/eft/game/IGameConfigResponse";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";

export class GameControllerOverride
{
    container: DependencyContainer;

    profileHelper: ProfileHelper;
    databaseServer: DatabaseServer;
    
    protected sessionBackendUrl: Record<string, string> = {};
    httpServerHelper: HttpServerHelper;
    
    constructor
    (
        container: DependencyContainer
    )
    {
        this.container = container;
        this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        this.databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.httpServerHelper = container.resolve<HttpServerHelper>("HttpServerHelper");
    }

    public setSessionBackendUrl(sessionID: string, backendUrl: string)
    {
        this.sessionBackendUrl[sessionID] = backendUrl;
    }

    private getGameConfig(sessionID: string, backendUrl: string): IGameConfigResponse
    {
        const profile = this.profileHelper.getPmcProfile(sessionID);

        if (backendUrl === undefined || backendUrl === "") {
            backendUrl =  this.httpServerHelper.getBackendUrl();
        }

        const config: IGameConfigResponse = {
            languages: this.databaseServer.getTables().locales.languages,
            ndaFree: false,
            reportAvailable: false,
            twitchEventMember: false,
            lang: "en",
            aid: profile.aid,
            taxonomy: 6,
            activeProfileId: `pmc${sessionID}`,
            backend: {
                Lobby: backendUrl,
                Trading: backendUrl,
                Messaging: backendUrl,
                Main: backendUrl,
                RagFair: backendUrl,
            },
            useProtobuf: false,
            utc_time: new Date().getTime() / 1000,
            totalInGame: profile.Stats?.Eft?.TotalInGameTime ?? 0
        };

        return config;
    }

    public override(): void 
    {
        this.container.afterResolution("GameController", (_t, result: GameController) => 
        {
            // We want to replace the original method logic with something different
            result.getGameConfig = (sessionID: string) => 
            {
                // get the requestUrl for the sessionID
                let backendUrl = this.sessionBackendUrl[sessionID];

                delete this.sessionBackendUrl[sessionID];

                return this.getGameConfig(sessionID, backendUrl);
            }
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, {frequency: "Always"});
    }
}