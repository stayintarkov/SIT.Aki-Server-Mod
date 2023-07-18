import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { Money } from "@spt-aki/models/enums/Money";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

export class TraderHelper
{
     /**
     * Add profile picture to our trader
     * @param baseJson json file for trader (db/base.json)
     * @param preAkiModLoader mod loader class - used to get the mods file path
     * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
     * @param traderImageName Filename of the trader icon to use
     */
     public registerProfileImage(baseJson: any, modName: string, preAkiModLoader: PreAkiModLoader, imageRouter: ImageRouter, traderImageName: string): void
     {
         // Reference the mod "res" folder
         const imageFilepath = `./${preAkiModLoader.getModPath(modName)}Traders/res`;
 
         // Register a route to point to the profile picture - remember to remove the .jpg from it
         imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/${traderImageName}`);
     }

    /**
     * Add record to trader config to set the refresh time of trader in seconds (default is 60 minutes)
     * @param traderConfig trader config to add our trader to
     * @param baseJson json file for trader (db/base.json)
     * @param refreshTimeSeconds How many sections between trader stock refresh
     */
    public setTraderUpdateTime(traderConfig: ITraderConfig, baseJson: any, refreshTimeSeconds: number): void
    {
        // Add refresh time in seconds to config
        const traderRefreshRecord: UpdateTime = {
            traderId: baseJson._id,
            seconds: refreshTimeSeconds };

        traderConfig.updateTime.push(traderRefreshRecord);
    }

    /**
     * Add our new trader to the database
     * @param traderDetailsToAdd trader details
     * @param tables database
     * @param jsonUtil json utility class
     */
    // rome-ignore lint/suspicious/noExplicitAny: traderDetailsToAdd comes from base.json, so no type
    public addTraderToDb(traderDetailsToAdd: any, tables: IDatabaseTables, jsonUtil: JsonUtil): void
    {
        // Add trader to trader table, key is the traders id
        tables.traders[traderDetailsToAdd._id] = {
            assort: this.createAssortTable(), // assorts are the 'offers' trader sells, can be a single item (e.g. carton of milk) or multiple items as a collection (e.g. a gun)
            base: jsonUtil.deserialize(jsonUtil.serialize(traderDetailsToAdd)) as ITraderBase, // Deserialise/serialise creates a copy of the json and allows us to cast it as an ITraderBase
            questassort: {
                started: {},
                success: {},
                fail: {}
            } // questassort is empty as trader has no assorts unlocked by quests
        };
    }

    /**
     * Create basic data for trader + add empty assorts table for trader
     * @param tables SPT db
     * @param jsonUtil SPT JSON utility class
     * @returns ITraderAssort
     */
    private createAssortTable(): ITraderAssort
    {
        // Create a blank assort object, ready to have items added
        const assortTable: ITraderAssort = {
            nextResupply: 0,
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }

        return assortTable;
    }

    /**
     * Add basic items to trader
     * @param tables SPT db
     * @param traderId Traders id (basejson/_id value)
     */
    public addSingleItemsToTrader(tables: IDatabaseTables, traderId: string)
    {
        // Get the table that can hold our new items
        const traderAssortTable = tables.traders[traderId].assort
        
        // Add milk, unlimited stock for 1 rouble with no buy restrictions
        const MILK_ID = "575146b724597720a27126d5"; // Can find item ids in `database\templates\items.json` or with https://db.sp-tarkov.com/search
        this.addSingleItemToAssort(traderAssortTable, MILK_ID, true, 9999999, 1, Money.ROUBLES, 1, false, 0);

        // Add salewa with 50 stock for 500 dollars + buy restriction of 2 per refresh
        const SALEWA_ID = "544fb45d4bdc2dee738b4568";
        this.addSingleItemToAssort(traderAssortTable, SALEWA_ID, false, 50, 1, Money.DOLLARS, 500, true, 2);
    }

    /**
     * Add items with sub items to trader
     * @param tables SPT db
     * @param traderId Traders id (basejson/_id value)
     * @param jsonUtil SPT JSON utility class
     */
    public addComplexItemsToTrader(tables: IDatabaseTables, traderId: string, jsonUtil: JsonUtil)
    {
        // Get the table that can hold our new items
        const traderAssortTable = tables.traders[traderId].assort

        // Get the mp133 preset and add to the traders assort (Could make your own Items[] array, doesn't have to be from presets)
        const mp133GunPreset = tables.globals.ItemPresets["584148f2245977598f1ad387"]._items;
        this.addItemWithSubItemsToAssort(jsonUtil, traderAssortTable, mp133GunPreset, false, 5, 1, Money.ROUBLES, 500, false, 0);

        // Create a pistol with some mods + add to trader
        const customGlock17 = this.createGlock();
        this.addItemWithSubItemsToAssort(jsonUtil, traderAssortTable, customGlock17, true, 69, 1, Money.EUROS, 5, true, 2);
    }

    /**
     * Create a weapon from scratch, ready to be added to trader
     * @returns Item[]
     */
    private createGlock(): Item[]
    {
        // Create an array ready to hold weapon + all mods
        const glock: Item[] = [];

        // Add the base first
        glock.push({ // Add the base weapon first
            _id: "glockBase", // Ids dont matter, as long as they are unique (can use hashUtil.generate() if you dont want to type every id by hand)
            _tpl: "5a7ae0c351dfba0017554310" // This is the weapons tpl, found on: https://db.sp-tarkov.com/search
        });

        // Add barrel
        glock.push({
            _id: "glockbarrel",
            _tpl: "5a6b60158dc32e000a31138b",
            parentId: "glockBase", // This is a sub item, you need to define its parent its attached to / inserted into
            slotId: "mod_barrel" // Required for mods, you need to define what 'role' they have
        });

        // Add reciever
        glock.push({
            _id: "glockReciever",
            _tpl:"5a9685b1a2750c0032157104",
            parentId: "glockBase",
            slotId: "mod_reciever"
        });

         // Add compensator
         glock.push({
            _id: "glockCompensator",
            _tpl:"5a7b32a2e899ef00135e345a",
            parentId: "glockReciever", // The parent of this mod is the reciever NOT weapon, be careful to get the correct parent
            slotId: "mod_muzzle"
        });

        // Add Pistol grip
        glock.push({
            _id: "glockPistolGrip",
            _tpl:"5a7b4960e899ef197b331a2d",
            parentId: "glockBase",
            slotId: "mod_pistol_grip"
        });

        // Add front sight
        glock.push({
            _id: "glockRearSight",
            _tpl: "5a6f5d528dc32e00094b97d9",
            parentId: "glockReciever",
            slotId: "mod_sight_rear"
        });

        // Add rear sight
        glock.push({
            _id: "glockFrontSight",
            _tpl: "5a6f58f68dc32e000a311390",
            parentId: "glockReciever",
            slotId: "mod_sight_front"
        });

        // Add magazine
        glock.push({
            _id: "glockMagazine",
            _tpl: "630769c4962d0247b029dc60",
            parentId: "glockBase",
            slotId: "mod_magazine"
        });

        return glock;
    }

    /**
     * Add item to assortTable + barter scheme + loyalty level objects
     * @param assortTable Trader assorts to add item to
     * @param itemTpl Items tpl to add to traders assort
     * @param unlimitedCount Can an unlimited number of this item be purchased from trader
     * @param stackCount Total size of item stack trader sells
     * @param loyaltyLevel Loyalty level item can be purchased at
     * @param currencyType What currency does item sell for
     * @param currencyValue Amount of currency item can be purchased for
     * @param hasBuyRestriction Does the item have a max purchase amount
     * @param buyRestrictionMax How many times can item be purchased per trader refresh
     */
    private addSingleItemToAssort(assortTable: ITraderAssort, itemTpl: string, unlimitedCount: boolean, stackCount: number, loyaltyLevel: number, currencyType: Money, currencyValue: number, hasBuyRestriction: boolean, buyRestrictionMax: number)
    {
        // Create item ready for insertion into assort table
        const newItemToAdd: Item = {
            _id: itemTpl,
            _tpl: itemTpl,
            parentId: "hideout", // Should always be "hideout"
            slotId: "hideout", // Should always be "hideout"
            upd: {
                UnlimitedCount: unlimitedCount,
                StackObjectsCount: stackCount
            }
        };

        // Items can have a buy restriction per trader refresh cycle, optional
        if(hasBuyRestriction)
        {
            newItemToAdd.upd.BuyRestrictionMax = buyRestrictionMax;
            newItemToAdd.upd.BuyRestrictionCurrent = 0;
        }

        assortTable.items.push(newItemToAdd);

        // Barter scheme holds the cost of the item + the currency needed (doesnt need to be currency, can be any item, this is how barter traders are made)
        assortTable.barter_scheme[itemTpl] = [
            [
                {
                    count: currencyValue,
                    _tpl: currencyType
                }
            ]
        ];

        // Set loyalty level needed to unlock item
        assortTable.loyal_level_items[itemTpl] = loyaltyLevel;
    }

        /**
         * Add a complex item to trader assort (item with child items)
         * @param assortTable trader assorts to add items to
         * @param jsonUtil JSON utility class
         * @param items Items array to add to assort
         * @param unlimitedCount Can an unlimited number of this item be purchased from trader
         * @param stackCount Total size of item stack trader sells
         * @param loyaltyLevel Loyalty level item can be purchased at
         * @param currencyType What currency does item sell for
         * @param currencyValue Amount of currency item can be purchased for
         * @param hasBuyRestriction Does the item have a max purchase amount
         * @param buyRestrictionMax How many times can item be purchased per trader refresh
         */
        private addItemWithSubItemsToAssort(jsonUtil: JsonUtil, assortTable: ITraderAssort, items: Item[], unlimitedCount: boolean, stackCount: number, loyaltyLevel: number, currencyType: Money, currencyValue: number, hasBuyRestriction: boolean, buyRestrictionMax: number): void
        {
            // Deserialize and serialize to ensure we dont alter the original data (clone it)
            const collectionToAdd: Item[] = jsonUtil.deserialize(jsonUtil.serialize(items));
    
            // Create upd object if its missing
            if (!collectionToAdd[0].upd)
            {
                collectionToAdd[0].upd = {};
            }

            // Update item base with values needed to make item sellable by trader
            collectionToAdd[0].upd = {
                UnlimitedCount: unlimitedCount,
                StackObjectsCount: stackCount
            }

            // Items can have a buy restriction per trader refresh cycle, optional
            if(hasBuyRestriction)
            {
                collectionToAdd[0].upd.BuyRestrictionMax = buyRestrictionMax;
                collectionToAdd[0].upd.BuyRestrictionCurrent = 0;
            }

            // First item should always have both properties set to 'hideout'
            collectionToAdd[0].parentId = "hideout";
            collectionToAdd[0].slotId = "hideout";
    
            // Push all the items into the traders assort table
            assortTable.items.push(...collectionToAdd);
    
            // Barter scheme holds the cost of the item + the currency needed (doesnt need to be currency, can be any item, this is how barter traders are made)
            assortTable.barter_scheme[collectionToAdd[0]._id] = [
                [
                    {
                        count: currencyValue,
                        _tpl: currencyType
                    }
                ]
            ];
    
            // Set loyalty level needed to unlock item
            assortTable.loyal_level_items[collectionToAdd[0]._id] = loyaltyLevel;
        }

     /**
     * Add traders name/location/description to the locale table
     * @param baseJson json file for trader (db/base.json)
     * @param tables database tables
     * @param fullName Complete name of trader
     * @param firstName First name of trader
     * @param nickName Nickname of trader
     * @param location Location of trader (e.g. "Here in the cat shop")
     * @param description Description of trader
     */
    public addTraderToLocales(baseJson: any, tables: IDatabaseTables, fullName: string, firstName: string, nickName: string, location: string, description: string)
    {
        // For each language, add locale for the new trader
        const locales = Object.values(tables.locales.global) as Record<string, string>[];
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
}