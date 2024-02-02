import { Client } from "@megachips/nat-upnp";
import { CoopConfig } from "./CoopConfig";

export class UPNPHelper {

    coopConfig: CoopConfig;
    akiPort: number;
    useUPNP: boolean;

    constructor(in_akiPort: number) {
        this.coopConfig = new CoopConfig();
        this.akiPort = in_akiPort;
        const ttl = 30 ;

        if(this.coopConfig.useUPNP)
        {
            this.doUPNPMappings();
        }
            // setInterval(this.doUPNPMappings, 30 * 1005);
    }

    doUPNPMappings() : void {

        const client = new Client({ timeout: 10 * 1000, cacheGateway: true });

        // last for 24 hours?
        const ttl = 24 * (60 * 60 * 1000);

        client
        .createMapping({
            public: this.akiPort,
            private: this.akiPort,
            protocol: "tcp",
            description: "AKI/SIT Web",
            ttl: ttl
        }).then(() => {

            client
            .createMapping({
                public: this.coopConfig.webSocketPort,
                private: this.coopConfig.webSocketPort,
                protocol: "tcp",
                description: "SIT WebSocket",
                ttl: ttl
            }).then(() => {

                client
                .createMapping({
                    public: this.coopConfig.natHelperPort,
                    private: this.coopConfig.natHelperPort,
                    protocol: "tcp",
                    description: "SIT NAT Helper",
                    ttl: ttl
                }).then(() => {

                    client
                    .createMapping({
                        public: 6972,
                        private: 6972,
                        protocol: "udp",
                        description: "SIT Default UDP/P2P",
                        ttl: ttl
                    }).then(() => {

                        client.getPublicIp().then((ip) => 
                        { 
                            console.log(`SIT: UPNP: External Ip of (${ip}) found`)

                        });
                        console.log(`SIT: UPNP: Successfully mapped ${this.akiPort},${this.coopConfig.webSocketPort},${this.coopConfig.natHelperPort},6972`);

                        client.close();
                    });
                });

            });
            
        }).catch((reason) => {
            console.error(`SIT: UPNP: Unable to map: ${reason}`);
            client.close();
        });

        
       
    }
}