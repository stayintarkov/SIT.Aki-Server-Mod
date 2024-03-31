// import { Client } from "@megachips/nat-upnp";
import { CoopConfig } from "../CoopConfig";
import ownUPNP from "./upnp/client";

export class UPNPHelper {

    // client:Client; 
    coopConfig: CoopConfig;
    akiIP: string;
    akiPort: number;
    useUPNP: boolean;

    constructor(in_akiIP: string, in_akiPort: number) {
        this.coopConfig = new CoopConfig();
        this.akiIP = in_akiIP;
        this.akiPort = in_akiPort;
        const ttl = 30 ;
        // this.client = new Client({ timeout: 10 * 1000, cacheGateway: true });

        if (this.akiIP === "" || this.akiIP === "127.0.0.1") {
            return;
        } 

        if(this.coopConfig.useUPNP) {
            // this.doUPNPMappingsMegachipsAxios(() => {

                this.doUPNPMappingsOwn();

            // });
        }
    }
 
    doUPNPMappingsOwn() : void {
        const client = new ownUPNP({ enablePMP: true, enableUPNP: true, permanentFallback: true });
        const akiPromise = client.portMapping({public: this.akiPort, private: this.akiPort, protocol: "TCP"});
        const sitWSPromise = client.portMapping({public: this.coopConfig.webSocketPort, private: this.coopConfig.webSocketPort, protocol: "TCP"});
        const natPromise = client.portMapping({public: this.coopConfig.natHelperPort, private: this.coopConfig.natHelperPort, protocol: "TCP"});
        const p2pPromise = client.portMapping({public: 6972, private: 6972, protocol: "UDP"});

        Promise.all(new Array(akiPromise, sitWSPromise, natPromise, p2pPromise)).then((x) => {
            console.log(`SIT: UPNP: Successfully mapped ${this.akiPort},${this.coopConfig.webSocketPort},${this.coopConfig.natHelperPort},6972`);
        }).catch((rejectedReason) => { 
            if (rejectedReason instanceof Error && rejectedReason.message.includes('Timeout')) {
                console.log(`SIT: UPNP: UPnP request timed out. Ignore if port forwarding or direct connection is in place.`);
            }
            else {
                console.log(`SIT: UPNP: Unable to Map: ${rejectedReason}`);
            }
        });
    }

    // doUPNPMappingsMegachipsAxios(completeCallback: any) : void {

    //     if (this.client === undefined)
    //         return;

    //     // last for 24 hours?
    //     const ttl = 24 * (60 * 60 * 1000);

    //     this.client
    //     .createMapping({
    //         public: this.akiPort,
    //         private: { host: this.akiIP, port: this.akiPort },
    //         protocol: "tcp",
    //         description: "AKI/SIT Web",
    //         ttl: ttl
    //     }).then(() => {

    //         this.client
    //         .createMapping({
    //             public: this.coopConfig.webSocketPort,
    //             private: { host: this.akiIP, port:  this.coopConfig.webSocketPort },
    //             protocol: "tcp",
    //             description: "SIT WebSocket",
    //             ttl: ttl
    //         }).then(() => {

    //             this.client
    //             .createMapping({
    //                 public: this.coopConfig.natHelperPort,
    //                 private: { host: this.akiIP, port:  this.coopConfig.natHelperPort },
    //                 protocol: "tcp",
    //                 description: "SIT NAT Helper",
    //                 ttl: ttl
    //             }).then(() => {

    //                 this.client
    //                 .createMapping({
    //                     public: 6972,
    //                     private: { host: this.akiIP, port: 6972 },
    //                     protocol: "udp",
    //                     description: "SIT Default UDP/P2P",
    //                     ttl: ttl
    //                 }).then(() => {

    //                     this.client.getPublicIp().then((ip) => 
    //                     { 
    //                         console.log(`SIT: UPNP: External Ip of (${ip}) found`)
    //                         this.client.close();
    //                         completeCallback();
    //                     });
    //                     console.log(`SIT: UPNP: Successfully mapped ${this.akiPort},${this.coopConfig.webSocketPort},${this.coopConfig.natHelperPort},6972`);
    //                 });
    //             });

    //         });
            
    //     }).catch((reason) => {
    //         console.error(`SIT: UPNP: Unable to map: ${reason}`);
    //     });

        
        
       
    // }
}