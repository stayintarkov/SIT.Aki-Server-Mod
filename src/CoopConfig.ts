import fs from "fs";
import path from "path";

export class CoopConfig {

    public externalIP: string;
    public webSocketPort: number;
    public useExternalIPFinder: boolean;

    constructor() {
        this.externalIP = "http://127.0.0.1:6969";
        this.webSocketPort = 6970;
        this.useExternalIPFinder = true;

        console.log(`============================================================`);
        console.log(`COOP MOD: Coop Config Loading`);
        console.log(`============================================================`);

        var coopConfigFilePath = path.join(__dirname, "..", "config", "coopConfig.json");
        console.log(coopConfigFilePath);
        if(!fs.existsSync(coopConfigFilePath)) {
            console.log(`Coop Config doesn't exist, creating default config.`);
            console.log(`BE AWARE! ExternalIPFinder is ACTIVE! The externalIP config value is ignored!`);
            fs.writeFileSync(coopConfigFilePath, JSON.stringify(this));
        }
        else {
            Object.assign(this, JSON.parse(fs.readFileSync(coopConfigFilePath).toString()))
            console.log(`COOP MOD: Coop Config loaded.`);
            if(this.useExternalIPFinder) {
                console.log(`COOP MOD: BE AWARE! ExternalIPFinder is ACTIVE!`);
            }
        }
        console.log(this);

        console.log(`============================================================`);

    }

}
