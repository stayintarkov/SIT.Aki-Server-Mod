## Made By Paulov-t

## Summary

This is the SERVER modification of [SPT-Aki](https://www.sp-tarkov.com/) to allow the [Coop Module](https://github.com/paulov-t/SIT.Core) to communicate with the SPT-Aki Server.

## Where does this repo go?

All mods must go in the server /user/mods/ folder

## How do I set up this mod?

### Coop Config JSON
* You must create a file called coopconfig.json in your SITCoop/src folder.
* In the file you must use the following config, replacing the IP with your own
```
{
    "externalIP": "http://{enter your external IP here}:6969"
}
```

### Http.json

* Open Aki_Data\Server\configs\http.json with your favourite text editor
* Change the `ip` setting to your internal network IP of your Computer Primary Network (Ethernet or Wi-Fi)
* Change the `logRequests` setting to `false` to prevent log spam


## Installing SPT-Aki to Azure Web Services
https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs
