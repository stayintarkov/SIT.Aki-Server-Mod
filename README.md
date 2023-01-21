
This project was created to automate most parts of building and setting up an environment.

## **NodeJS:**

The first step would be to install nodejs on your pc, the version you NEED is **16.17.1**

That version is the one that has been used to test the mod templates and build scripts.

It can be downloaded from here: https://nodejs.org/dist/v16.17.1/node-v16.17.1-x64.msi

A system reboot may be needed after install.

## **IDE:**

The second step is having an IDE ready. We've setup a VSCodium workspace file to help with this.

You CAN use Visual Studio Code if you so desire, just keep in mind that our dev tests on the mod files was done using VSCodium.

You can get VSCodium here: https://vscodium.com/#install

## **Workspace:**

Once you have NodeJS and VSCodium ready, open the mod.code-workspace file with VSCodium (File->Open Workspace from File...).

Once the project loads into VSCodium you will be recommended to install the ESLint plugin. This is HIGHLY recommended.

## **Environment Setup:**

There is a task that will automatically setup your environment to use typescript.

To run it, you just need to go to: 

> Terminal->Run Task...->Show All Tasks...->npm: install

After running this task, your environment will be ready to start coding.

DO NOT remove the node_modules folder, this is an auto generated directory that has the required dependencies to be able to use typescript and more.

## **IMPORTANT:**

Before starting to work on your mod, we suggest you read about Dependency Injection and Inversion of Control as this is the adopted architecture SPT-AKI has adopted.

It will be difficult to understand some of the problems you may be having if you dont understand the basics of it.

A guide explaining all the essentials will be available on the hub on release for you to read about.

## **Coding:**

All your work should be centered around the mod.ts file as an entry point.
You can ONLY change the following properties from the package.json file: `"name"`, `"version"`, `"license"`: `"MIT"`, `"author"`, `"akiVersion"`.

If you have never used typescript before, you can read about it here: https://www.typescriptlang.org/docs/

## **Distributing your mod:**

The project has been set up with an automatic task that will copy and zip ALL required files for your mod to work on SPT-AKI.
To run this task you just need to go to: 

> Terminal->Run Task...->Show All Tasks...->npm: build:zip

The output will be a mod.zip file that will appear on the root of the project.

Always verify that all files were included into the zip file.