import { RawResponse } from "../index";
export declare class Device implements IDevice {
    readonly description: string;
    readonly services: string[];
    constructor(url: string);
    private getXML;
    getService(types: string[]): Promise<{
        service: string;
        SCPDURL: string;
        controlURL: string;
    }>;
    run(action: string, args: (string | number)[][]): Promise<RawResponse>;
    parseDescription(info: {
        device?: RawDevice;
    }): {
        services: RawService[];
        devices: RawDevice[];
    };
}
export default Device;
export interface Service {
    service: string;
    SCPDURL: string;
    controlURL: string;
}
export interface RawService {
    serviceType: string;
    serviceId: string;
    controlURL?: string;
    eventSubURL?: string;
    SCPDURL?: string;
}
export interface RawDevice {
    deviceType: string;
    presentationURL: string;
    friendlyName: string;
    manufacturer: string;
    manufacturerURL: string;
    modelDescription: string;
    modelName: string;
    modelNumber: string;
    modelURL: string;
    serialNumber: string;
    UDN: string;
    UPC: string;
    serviceList?: {
        service: RawService | RawService[];
    };
    deviceList?: {
        device: RawDevice | RawDevice[];
    };
}
export interface IDevice {
    /**
     * Get the available services on the network device
     * @param types List of service types to look for
     */
    getService(types: string[]): Promise<Service>;
    /**
     * Parse out available services
     * and devices from a root device
     * @param info
     * @returns the available devices and services in array form
     */
    parseDescription(info: {
        device?: RawDevice;
    }): {
        services: RawService[];
        devices: RawDevice[];
    };
    /**
     * Perform a SSDP/UPNP request
     * @param action the action to perform
     * @param kvpairs arguments of said action
     */
    run(action: string, kvpairs: (string | number)[][]): Promise<RawResponse>;
}
