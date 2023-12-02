import { DependencyContainer } from "tsyringe";
import { StayInTarkovMod } from "../StayInTarkovMod";
import { LocationCallbacks } from "@spt-aki/callbacks/LocationCallbacks";
import { LocationController } from "@spt-aki/controllers/LocationController";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

export class LocationCallbacksOverride
{   
    container: DependencyContainer;
    locationController: LocationController;
    httpResponse: HttpResponseUtil;

    locationData: object = {};

    constructor
    (
        container: DependencyContainer,
    )
    {
        this.container = container;
        this.locationController = container.resolve<LocationController>("LocationController");
        this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
    }

    public generateNewLootForLocation(sessionID: string, request: IGetLocationRequestData) {

        if(this.locationData[request.locationId] === undefined)
            this.locationData[request.locationId] = {};

        this.locationData[request.locationId].Data = this.locationController.get(sessionID, request);
        
        // const ownedCoopMatch = this.getCoopMatch(sessionID);

        const ownedCoopMatch = StayInTarkovMod.Instance.getCoopMatch(`pmc${sessionID}`);
        if(ownedCoopMatch !== undefined) {
            ownedCoopMatch.Loot = this.locationData[request.locationId].Loot;
        }
        else {
            // console.warn(`Could not save Location Loot for match ${sessionID}. Unable to find Match.`);
        }
    }

    public override(): void 
    {
        this.container.afterResolution("LocationCallbacks", (_t, result: LocationCallbacks) => {

             result.getLocation = (url: string, info: IGetLocationRequestData, sessionID: string) => {


                // This is HACK to test out getting same loot on multiple clients
                if (this.locationData[info.locationId] === undefined) {
                    console.log(`No cached locationData found for ${info.locationId}. Creating it now!`);
                    this.generateNewLootForLocation(sessionID, info);
                    this.locationData[info.locationId].Loot = this.locationData[info.locationId].Data.Loot;
                }

                // // This is a HACK. For some reason (not figured out yet) the Loot field empties after it has been generated. So refilling it here.
                if (this.locationData[info.locationId].Data.Loot.length === 0) 
                {
                    this.locationData[info.locationId].Data.Loot = this.locationData[info.locationId].Loot;
                }

                return this.httpResponse.getBody(this.locationData[info.locationId].Data);

            }

        }, {frequency: "Always"});
    }
}