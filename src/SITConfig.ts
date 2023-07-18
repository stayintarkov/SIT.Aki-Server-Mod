import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import fs from "fs";
import path from "path";

export class SITConfig {

    public runAzureWebAppHelper: boolean;


    public openAllExfils: boolean;

    // Player Names
    public showPlayerNameTags: boolean;
    public showPlayerNameTagsOnlyWhenVisible: boolean;

    public static Instance: SITConfig;

    constructor() {
        this.runAzureWebAppHelper = false;

        this.openAllExfils = true;
        
        this.showPlayerNameTags = false;
        this.showPlayerNameTagsOnlyWhenVisible = false;

        // console.log(`SIT Config Loading >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);

        var sitConfigFilePath = path.join(__dirname, "..", "config", "SITConfig.json");
        // console.log(sitConfigFilePath);
        if(!fs.existsSync(sitConfigFilePath)) {
            const sitcfgString = JSON.stringify(this, null, 4);
            fs.writeFileSync(sitConfigFilePath, sitcfgString);
        }
        else {
            Object.assign(this, JSON.parse(fs.readFileSync(sitConfigFilePath).toString()))
            // console.log(`SIT Config loaded.`);
        }
        // console.log(this);

    }

    public routeHandler(staticRouterModService: StaticRouterModService, dynamicRouterModService: DynamicRouterModService) {

         staticRouterModService.registerStaticRouter(
            "sit-config-service",
            [
                {
                    url: "/SIT/Config",
                    action: (url, info: any, sessionId, output) => {
                        console.log(SITConfig.Instance)
                        output = JSON.stringify(SITConfig.Instance);
                        return output;
                    }
                }
            ]
            ,"aki"
        )

    }

}
