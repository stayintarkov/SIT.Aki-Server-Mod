import { inject, injectable } from "tsyringe";

import { ApplicationContext } from "../context/ApplicationContext";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { ILocationBase } from "../models/eft/common/ILocationBase";
import { IGetRaidTimeRequest } from "../models/eft/game/IGetRaidTimeRequest";
import { ExtractChange, IGetRaidTimeResponse } from "../models/eft/game/IGetRaidTimeResponse";
import { ILocationConfig, IScavRaidTimeLocationSettings, LootMultiplier } from "../models/spt/config/ILocationConfig";
import { IRaidChanges } from "../models/spt/location/IRaidChanges";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RandomUtil } from "../utils/RandomUtil";

export declare class RaidTimeAdjustmentService
{
    protected locationConfig: ILocationConfig;

    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected randomUtil: RandomUtil;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;

    /**
     * Make alterations to the base map data passed in
     * Loot multipliers/waves/wave start times
     * @param raidAdjustments Changes to process on map
     * @param mapBase Map to adjust
     */
    makeAdjustmentsToMap(raidAdjustments: IRaidChanges, mapBase: ILocationBase): void;

    /**
     * Adjust the loot multiplier values passed in to be a % of their original value
     * @param mapLootMultiplers Multiplers to adjust
     * @param loosePercent Percent to change values to
     */
    adjustLootMultipliers(mapLootMultiplers: LootMultiplier, loosePercent: number): void;

    /**
     * Adjust bot waves to act as if player spawned later
     * @param mapBase map to adjust
     * @param raidAdjustments Map adjustments
     */
    adjustWaves(mapBase: ILocationBase, raidAdjustments: IRaidChanges): void;

    /**
     * Create a randomised adjustment to the raid based on map data in location.json
     * @param sessionId Session id
     * @param request Raid adjustment request
     * @returns Response to send to client
     */
    getRaidAdjustments(sessionId: string, request: IGetRaidTimeRequest): IGetRaidTimeResponse;

    /**
     * Get raid start time settings for specific map
     * @param location Map Location e.g. bigmap
     * @returns IScavRaidTimeLocationSettings
     */
    getMapSettings(location: string): IScavRaidTimeLocationSettings;

    /**
     * Adjust exit times to handle scavs entering raids part-way through
     * @param mapBase Map base file player is on
     * @param newRaidTimeMinutes How long raid is in minutes
     * @returns List of  exit changes to send to client
     */
    getExitAdjustments(mapBase: ILocationBase, newRaidTimeMinutes: number): ExtractChange[];
}
