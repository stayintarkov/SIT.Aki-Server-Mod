import { LocationController } from "@spt-aki/controllers/LocationController";
import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { DependencyContainer } from "tsyringe";

export class LocationControllerOverride
{   
    container: DependencyContainer;
    locationData: object = {};
    
    constructor
    (
        container: DependencyContainer
    )
    {
        this.container = container;
    }

    public override(): void 
    {

        this.container.afterResolution("LocationController", (_t, result: LocationController) => {

            result.get = (sessionId: string, request: IGetLocationRequestData) => {

                if (this.locationData[request.locationId] === undefined) {

                    // const name = location.toLowerCase().replace(" ", "");
                    // this.locationData2[location] = result.generate(name);
                    this.locationData[request.locationId] = result.get(sessionId, request);
                }
                
                return this.locationData[request.locationId];
            }


        }, {frequency: "Always"});
    }
}