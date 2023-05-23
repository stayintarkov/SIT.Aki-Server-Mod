
// get external IP address using ipify https://stackoverflow.com/questions/20273128/node-js-how-to-get-my-external-ip-address-in-node-js-app/37850722#37850722
// this code was created by chatGPT
const http = require('http');


export class ExternalIPFinder {

    public IP: string;

    constructor() {

        const externalIPFinderC = this;

         // Set the URL of the request to the ipify API
        const options = {
            host: 'api.ipify.org',
            port: 80,
            path: '/?format=json'
        };

        // Create a new http.ClientRequest object
        const req = http.request(options, (res) => {
            // Set the response encoding to utf8
            res.setEncoding('utf8');

            // When a chunk of data is received, append it to the body
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });

            // When the response completes, parse the JSON and log the IP address
            res.on('end', () => {
                const data = JSON.parse(body);
                // console.log(data.ip);
                externalIPFinderC.IP = data.ip;
            });
        });

        // Send the request
        req.end();
    }
}