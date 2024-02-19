Param(
    [Parameter(Mandatory = $false)]
    [Switch] $Overwrite,

    [Parameter(Mandatory = $false)]
    [string] $Branch,

    [Parameter(Mandatory = $false)]
    [string] $Commit
)

$ErrorActionPreference = "Stop"
$SOURCE_REPO = "https://dev.sp-tarkov.com/SPT-AKI/Server.git"
$SERVER_DIR = "./Aki-Server"
$ZIP_Folder = "./tempZipContents"

# build coop mod
npm ci
npm run build

if ($LASTEXITCODE -ne 0) {
    throw ("coop mod npm run build failed, exit code $LASTEXITCODE")
}

# clone aki server
if (Test-Path -Path $SERVER_DIR) {
    if ($Overwrite -or (Read-Host "$SERVER_DIR exists, delete? [y/n]") -eq 'y') {
        Write-Output "$SERVER_DIR exists, removing"
        Remove-Item -Recurse -Force $SERVER_DIR
    }
    else {
        Exit 1
    }
}

Write-Output "clone repo"
if ( $Branch.Length -gt 0 ) {
    Write-Output "Cloning branch/tag $Branch"
    git clone --depth 1 -b $Branch $SOURCE_REPO $SERVER_DIR
} 
else {
    Write-Output "Cloning default branch"
    git clone --depth 1 $SOURCE_REPO $SERVER_DIR
}

Set-Location $SERVER_DIR

if ($Commit.Length -gt 0) {
    Write-Output "Checking out the commit $Commit"
    git fetch --depth=1 $SOURCE_REPO $Commit
    git checkout $Commit

    if ($LASTEXITCODE -ne 0) {
        throw ("Commit $Commit checkout failed. It doesn't exist? git exit code $LASTEXITCODE")
    }
}

#$Head = git rev-parse --short HEAD
#$Branch = git rev-parse --abbrev-ref HEAD
#$CTime = git log -1 --format="%at"
#$CTimeS = (([System.DateTimeOffset]::FromUnixTimeSeconds($CTime)).DateTime).ToString("yyyyMMddHHmmss")
#
#Write-Output "Current HEAD is at $Head in $Branch committed at $CTimeS"
#
#$Tag = git describe --tags --abbrev=0 $Head
#$IsTag = $LASTEXITCODE -eq 0
#if ($IsTag) {
#    Write-Output "We also have a tag $Tag at HEAD"
#}

Write-Output "lfs"
git lfs fetch
git lfs pull

Write-Output "build"
Set-Location ./project
npm install
npm run build:release

if ($LASTEXITCODE -ne 0) {
    throw ("npm run build:$Target failed, exit code $LASTEXITCODE")
}

Get-ChildItem ./build
#$AkiMeta = (Get-Content ./build/Aki_Data/Server/configs/core.json | ConvertFrom-Json -AsHashtable)
#Write-Output $akiMeta
#
#if ($IsTag) {
#    $CInfo = "tag-$Tag"
#}
#elseif ($Branch.Equals("HEAD")) {
#    $CInfo = "$Head-$CTimeS"
#}
#else {
#    $CInfo = "$Branch-$Head-$CTimeS"
#}
#
#$Suffix = "$Target-v$($akimeta.akiVersion)-$CInfo-Tarkov$($akimeta.compatibleTarkovVersion)"

Set-Location ../../

New-Item -ItemType Directory -Force -Path "$ZIP_Folder/user/mods/"
Copy-Item -Path "$SERVER_DIR/project/build\*" -Destination "$ZIP_Folder" -Recurse
Copy-Item -Path "./SITCoop" -Destination "$ZIP_Folder/user/mods/" -Recurse

# make release package
if ($IsWindows) {
    $ZipName = "Aki-Server-win-with-SITCoop.zip"
    Compress-Archive -Path "$ZIP_Folder/*" -DestinationPath "$ZipName" -Force
}
else{
    $ZipName = "Aki-Server-linux-with-SITCoop.tar.gz"
    Set-Location "$ZIP_Folder"
    tar --overwrite -cz -f "../$ZipName" ./*
}

Write-Output "Built file: $ZipName"
Write-Output "ZIP_NAME=$ZipName" >> "$env:GITHUB_OUTPUT"
