import http = require('http');
import https = require('https');
import { ConfigTypes } from '@spt-aki/models/enums/ConfigTypes';
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { CertGenerator } from './CertGenerator';
import { SITConfig } from './SITConfig';

// This class will start up and handle Azure WebApp HTTPS:8080 protocol handling
export class AzureWebAppHelper {

    configServer: ConfigServer;
    httpConfig: any;
    certificate: CertGenerator;

    constructor(in_configServer: ConfigServer) {

        this.configServer = in_configServer;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
        this.certificate = new CertGenerator();
        const certResult = this.certificate.generate(`${this.httpConfig.ip}`);

        let sitConfig = new SITConfig();
        if(sitConfig.runAzureWebAppHelper === undefined || sitConfig.runAzureWebAppHelper === false)
            return;

        const options : https.ServerOptions = {
            key: certResult.private,
            cert: certResult.cert
        }

        https.createServer(options, (req, res) => {

            if(req.method === "GET") {
                // console.log(req.method);
                // http.get(`http://${this.httpConfig.ip}:${this.httpConfig.port}`, {})
                //     .on("finish", ()=>{});
            }
            res.writeHead(200);
            res.end('PING HTTPS\n');

        }).listen(8080, `${this.httpConfig.ip}`);
    }
}