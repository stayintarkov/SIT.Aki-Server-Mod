import { ITemplateItem } from "../models/eft/common/tables/ITemplateItem";
import { IBotConfig } from "../models/spt/config/IBotConfig";
import { ConfigServer } from "../servers/ConfigServer";
import { RandomUtil } from "../utils/RandomUtil";
import { BotHelper } from "./BotHelper";
export declare class DurabilityLimitsHelper {
    protected randomUtil: RandomUtil;
    protected botHelper: BotHelper;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(randomUtil: RandomUtil, botHelper: BotHelper, configServer: ConfigServer);
    getRandomisedMaxWeaponDurability(itemTemplate: ITemplateItem, botRole: string): number;
    getRandomisedMaxArmorDurability(itemTemplate: ITemplateItem, botRole: string): number;
    getRandomisedWeaponDurability(itemTemplate: ITemplateItem, botRole: string, maxDurability: number): number;
    getRandomisedArmorDurability(itemTemplate: ITemplateItem, botRole: string, maxDurability: number): number;
    protected generateMaxWeaponDurability(botRole: string): number;
    protected generateMaxPmcArmorDurability(itemMaxDurability: number): number;
    protected getLowestMaxWeaponFromConfig(botRole: string): number;
    protected getHighestMaxWeaponDurabilityFromConfig(botRole: string): number;
    protected generateWeaponDurability(botRole: string, maxDurability: number): number;
    protected generateArmorDurability(botRole: string, maxDurability: number): number;
    protected getMinWeaponDeltaFromConfig(botRole: string): number;
    protected getMaxWeaponDeltaFromConfig(botRole: string): number;
    protected getMinArmorDeltaFromConfig(botRole: string): number;
    protected getMaxArmorDeltaFromConfig(botRole: string): number;
}
