import CoopConfig = require("./CoopConfig");

// get external IP address using ipify https://stackoverflow.com/questions/20273128/node-js-how-to-get-my-external-ip-address-in-node-js-app/37850722#37850722
import http = require('http');


export class ExternalIPFinder {

    public Found: boolean;
    public IP: string;
    private coopConfig: CoopConfig.CoopConfig;
    private httpConfig: any;

    private resolvedExternalIP: string;

    constructor(coopConfig: CoopConfig.CoopConfig, httpConfig: any) {

        this.coopConfig = coopConfig;
        this.httpConfig = httpConfig;

        this.getIp();
    }

    private getIp() {
        const externalIPFinderC = this;

         // Set the URL of the request to the ipify API
        const options = {
            host: 'api.ipify.org',
            port: 80,
            path: '/?format=json',
            async: false,
            timeout: 30000
        };

        http.get(options, (res)=> {
            // Set the response encoding to utf8
            res.setEncoding('utf8');

            // When a chunk of data is received, append it to the body
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });

            // When the response completes, parse the JSON and log the IP address
            res.on('end', () => {
                if(body === undefined || body.charAt(0) == 'B') {
                    console.error("ExternalIPFinder failed! Reverting to your config's externalIP");
                    externalIPFinderC.Found = false;
                    return;
                }
                const data = JSON.parse(body);
                if(data == "undefined" || data.ip == "undefined") {
                    console.error("ExternalIPFinder failed! Reverting to your config's externalIP");
                    externalIPFinderC.Found = false;
                    return;
                }
                // console.log(data.ip);
                externalIPFinderC.IP = data.ip;
                externalIPFinderC.Found = true;

            });

        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

        // // Create a new http.ClientRequest object
        // const req = http.request(options, (res) => {
        //     // Set the response encoding to utf8
        //     res.setEncoding('utf8');

        //     // When a chunk of data is received, append it to the body
        //     let body = '';
        //     res.on('data', (chunk) => {
        //         body += chunk;
        //     });

        //     // When the response completes, parse the JSON and log the IP address
        //     res.on('end', () => {
        //         if(body === undefined || body.charAt(0) == 'B') {
        //             console.error("ExternalIPFinder failed! Reverting to your config's externalIP");
        //             externalIPFinderC.Found = false;
        //             return;
        //         }
        //         const data = JSON.parse(body);
        //         if(data == "undefined" || data.ip == "undefined") {
        //             console.error("ExternalIPFinder failed! Reverting to your config's externalIP");
        //             externalIPFinderC.Found = false;
        //             return;
        //         }
        //         // console.log(data.ip);
        //         externalIPFinderC.IP = data.ip;
        //         externalIPFinderC.Found = true;

        //     });
        // });

        // // Send the request
        // req.end();
    }

    public resolveExternalIP() : string {

        if(this.resolvedExternalIP !== undefined) {
            return this.resolvedExternalIP;
        }

        this.resolvedExternalIP = `${this.coopConfig.protocol}://${this.coopConfig.externalIP}:${this.httpConfig.port}`;

        if(!this.Found && this.coopConfig.useExternalIPFinder) { 
            console.warn("ExternalIPFinder has not found an IP. Using the config provided Address! " + this.resolvedExternalIP);
            return this.resolvedExternalIP;
        }

        if(this.coopConfig.useExternalIPFinder) { 
            console.log(`============================================================`);
            console.log(`COOP: Auto-External-IP-Finder`);
            if(this.IP === undefined || this.IP === undefined || this.IP == "undefined") {
                this.IP = this.coopConfig.externalIP;
                console.warn("ExternalIPFinder failed! Reverted back to ExternalIP in Config");
            }
            this.resolvedExternalIP = `${this.coopConfig.protocol}://` + this.IP + `:${this.httpConfig.port}`;
            console.log(this.resolvedExternalIP);
            console.log(`============================================================`);
        }

        return this.resolvedExternalIP;
        
    }
    
}