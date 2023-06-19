import fs = require('fs');
import selfsigned from 'selfsigned';
/**
 * Generates a Https Certificate
 */
export class CertGenerator {

  private certDir:string;
  private certFile:any;
  private keyFile:any;

  constructor() {
    this.certDir = process.cwd() + "\\user\\mods\\SITCoop\\config\\certs\\";
    // console.log(this.certDir);
    this.certFile = this.certDir + "cert.pem";
    this.keyFile = this.certDir + "key.pem";
    // this.certFile = internal.resolve(this.certDir, "cert.pem");
    // this.keyFile = internal.resolve(this.certDir, "key.pem");
  }
  /**
   * Generates a Certificate
   * @param {string} serverIp 
   * @returns {object} { cert, key }
   */
  generate(serverIp):selfsigned.GenerateResult {

    // if (fs.existsSync(this.certFile) && fs.existsSync(this.keyFile)) {
    //   const cert = fs.readFileSync(this.certFile).toJSON();
    //   const key = fs.readFileSync(this.keyFile).toJSON();
    //   return { cert, key };
    // }

  //   // create directory if not exists
  //   if (!fileIO.exist(this.certDir)) {
  //     fileIO.mkDir(this.certDir);
  //   }

    // let fingerprint, cert, key;
    let generatedResult :selfsigned.GenerateResult;

    generatedResult = selfsigned.generate(null, {
      keySize: 2048, // the size for the private key in bits (default: 1024)
      days: 365, // how long till expiry of the signed certificate (default: 365)
      algorithm: "sha256", // sign the certificate with specified algorithm (default: 'sha1')
      extensions: [{ name: "commonName", cA: true, value: serverIp + "/" }], // certificate extensions array
      pkcs7: true, // include PKCS#7 as part of the output (default: false)
      clientCertificateCN: "jdoe", // client certificate's common name (default: 'John Doe jdoe123')
    });

  //  // logger.logInfo(`Generated self-signed sha256/2048 certificate ${fingerprint}, valid 365 days`);

  fs.writeFileSync(this.certFile, generatedResult.cert);
  fs.writeFileSync(this.keyFile, generatedResult.private);
  //   //fileIO.write(this.certFile, cert, true);
  //  // fileIO.write(this.keyFile, key, true);

    return generatedResult;
  }
}