<div align=center style="text-align: center;">
<h1> Stay in Tarkov </h1>
A SPT-Aki mod to be used with SPT-Aki Server to allow the Client Coop Module to communicate with the SPT-Aki Server.
</div>

---

<div align=center>

![GitHub all releases](https://img.shields.io/github/downloads/paulov-t/SIT.Aki-Server-Mod/total) ![GitHub release (latest by date)](https://img.shields.io/github/downloads/paulov-t/SIT.Aki-Server-Mod/latest/total)

</div>

---

## Summary

This is the SERVER modification of [SPT-Aki](https://www.sp-tarkov.com/) to allow the [SIT Client mod](https://github.com/stayintarkov/StayInTarkov.Client) to communicate with the SPT-Aki Server.

**NOTE:** The server mod is useless without the SIT Client mod. See the repo (linked above) for instructions on installing it. 

## How to install the SPT-Aki Server Mod?

If you already use SPT, it's recommended to create a separate Aki-server install as opposed to installing SIT on your existing one (if you have the space). It'll keep things more manageable in case you switch between using SIT and SPT.
If you aren't using the latest Aki server, you need to update or install new.

- Create a new folder for the Aki-Server (we'll refer to it as `SIT/server/` here)
- Download the latest [SPT-Aki Release](https://www.sp-tarkov.com/#download) and extract the server files to `SIT/server/`
  * You only need the following folders/files:
    * `Aki_Data/`
    * `Aki.Server.exe`
  * Run `Aki.Server.exe` once, until it reaches the 'happy playing!' message. Then close the server.
- Download the latest ["Source code" release](https://github.com/paulov-t/SIT.Aki-Server-Mod/releases) 
  * In the future, latest releases will be in this repo's releases page like you'd expect. This repo is newly-migrated from paulov's personal repos, so old builds are found there at the above link.
- Extract the release into the `SIT/server/user/mods/` folder
- Rename the folder SITCoop (ie `SIT/server/user/mods/SITCoop`)

As an alternative to steps 3-4, you can clone this repo into `SIT/server/user/mods/`. This will likely be far, far buggier, and is not recommended unless you have a reason to do so. If you installed this way, you're likely to receive less support.

## How do I configure this mod?

### Coop Config JSON
* You must configure the file called coopConfig.json in your SITCoop/config folder. This file is auto generated on first run of the mod.

#### IF you are using PORT FORWARDING
* In the file you must use the following config, replacing `127.0.0.1` with your own IPv4 from https://www.whatismyip.com and set useExternalIPFinder to false 
* OR set useExternalIPFinder to true

#### IF you are using HAMACHI or other VPN service
* set useExternalIPFinder to false
* set externalIP to your desired IP from the service

### Http.json

* Open Aki_Data\Server\configs\http.json with your favourite text editor
* Change the `ip` setting to your internal network IP of your Computer Primary Network (Ethernet or Wi-Fi)
* Change the `logRequests` setting to `false` to prevent log spam


## Installing SPT-Aki to Azure Web Services
https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs
