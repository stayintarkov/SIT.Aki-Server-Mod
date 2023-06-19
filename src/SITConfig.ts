import fs from "fs";
import path from "path";

export class SITConfig {

    public openAllExfils: boolean;
    public runAzureWebAppHelper: boolean;

    constructor() {
        this.openAllExfils = true;
        this.runAzureWebAppHelper = false;

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

}
