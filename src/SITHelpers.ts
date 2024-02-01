import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import tsyringe = require("tsyringe");

@tsyringe.injectable()
export class SITHelpers {

    /**
     * This ensures the Equipment Id is unique to each Profile
       This was introduced because the replication systems require each Player to have a unique Equipment Id, otherwise it would put the wrong items on to the wrong Player
       This runs every time the Game Starts and only affects the User loading the game
       We should keep it running each time to ensure we dont suffer from a hardcoded nightmare later down the line (e.g. Aki change the EquipmentId)
     * @param sessionID 
     * @returns 
     */
     public fixProfileEquipmentId(container: tsyringe.DependencyContainer, sessionID: string) {

        const saveServer = container.resolve<SaveServer>("SaveServer");
        // ---------------------------------------------------------------------------------------
        // This ensures the Equipment Id is unique to each Profile
        // This was introduced because the replication systems require each Player to have a unique Equipment Id, otherwise it would put the wrong items on to the wrong Player
        // This runs every time the Game Starts and only affects the User loading the game
        // We should keep it running each time to ensure we dont suffer from a hardcoded nightmare later down the line (e.g. Aki change the EquipmentId)
        // ---------------------------------------------------------------------------------------
        const myProfile = saveServer.getProfile(sessionID);

        if (myProfile.characters.pmc.Inventory === undefined)
            return;

        // Current Equipment Id (Aki's default is 5fe49a0e2694b0755a50476c)
        const equipmentId = myProfile.characters.pmc.Inventory.equipment;
        // Generate a new Equipment Id using Aki's HashUtil
        const newEquipmentId =  container.resolve<HashUtil>("HashUtil").generate();
        // Convert into json string
        const inventoryString = JSON.stringify(myProfile.characters.pmc.Inventory);
        // Using regex, replace the old equipment id with the generated one in the inventory string
        const resultString = inventoryString.replace(new RegExp(equipmentId, 'g'), newEquipmentId);
        // Parse the inventory string back into the profile object 
        myProfile.characters.pmc.Inventory = JSON.parse(resultString);
        // Save the profile back to disk
        saveServer.saveProfile(sessionID);
    }
}