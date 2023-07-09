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

        const serverOptions : https.ServerOptions = {
            key: certResult.private,
            cert: certResult.cert
        }
        const postData = JSON.stringify({
          'msg': 'Hello World!'
        });
        
        
        // * const req = http.request(options, (res) => {
        // *   console.log(`STATUS: ${res.statusCode}`);
        // *   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        // *   res.setEncoding('utf8');
        // *   res.on('data', (chunk) => {
        // *     console.log(`BODY: ${chunk}`);
        // *   });
        // *   res.on('end', () => {
        // *     console.log('No more data in response.');
        // *   });
        // * });
        // *
        // * req.on('error', (e) => {
        // *   console.error(`problem with request: ${e.message}`);
        // * });
        // *
        // * // Write data to request body
        // * req.write(postData);
        // * req.end();
        // * ```

        console.log(`Starting AZWA HTTPS on ${this.httpConfig.ip}`)
        https.createServer(serverOptions, (req, res) => {

            const getOptions = {
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': Buffer.byteLength(postData)
                }
             };

             let requestUrl = req.url;
             if(!requestUrl.endsWith("/"))
                requestUrl = requestUrl + "/";

            if(req.method === "GET") {
                // console.log(req.method);
                http.get(`http://${this.httpConfig.ip}:${this.httpConfig.port}` + requestUrl
                    , getOptions, (res) => 
                    {



                    })
            }
            res.writeHead(200);
            res.end('PING HTTPS\n');

        }).listen(8080, `${this.httpConfig.ip}`);
    }
}