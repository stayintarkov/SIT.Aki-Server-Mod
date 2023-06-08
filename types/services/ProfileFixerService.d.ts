import { HideoutHelper } from "../helpers/HideoutHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Bonus, HideoutSlot } from "../models/eft/common/tables/IBotBase";
import { IPmcDataRepeatableQuest, IRepeatableQuest } from "../models/eft/common/tables/IRepeatableQuests";
import { StageBonus } from "../models/eft/hideout/IHideoutArea";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { HideoutAreas } from "../models/enums/HideoutAreas";
import { ILogger } from "../models/spt/utils/ILogger";
import { DatabaseServer } from "../servers/DatabaseServer";
import { TimeUtil } from "../utils/TimeUtil";
import { Watermark } from "../utils/Watermark";
import { LocalisationService } from "./LocalisationService";
export declare class ProfileFixerService {
    protected logger: ILogger;
    protected watermark: Watermark;
    protected hideoutHelper: HideoutHelper;
    protected localisationService: LocalisationService;
    protected timeUtil: TimeUtil;
    protected databaseServer: DatabaseServer;
    constructor(logger: ILogger, watermark: Watermark, hideoutHelper: HideoutHelper, localisationService: LocalisationService, timeUtil: TimeUtil, databaseServer: DatabaseServer);
    /**
     * Find issues in the pmc profile data that may cause issues and fix them
     * @param pmcProfile profile to check and fix
     */
    checkForAndFixPmcProfileIssues(pmcProfile: IPmcData): void;
    /**
     * Add tag to profile to indicate when it was made
     * @param fullProfile
     */
    addMissingAkiVersionTagToProfile(fullProfile: IAkiProfile): void;
    /**
     * TODO - make this non-public - currently used by RepeatableQuestController
     * Remove unused condition counters
     * @param pmcProfile profile to remove old counters from
     */
    removeDanglingConditionCounters(pmcProfile: IPmcData): void;
    addLighthouseKeeperIfMissing(pmcProfile: IPmcData): void;
    protected addUnlockedInfoObjectIfMissing(pmcProfile: IPmcData): void;
    protected removeDanglingBackendCounters(pmcProfile: IPmcData): void;
    protected getActiveRepeatableQuests(repeatableQuests: IPmcDataRepeatableQuest[]): IRepeatableQuest[];
    protected fixNullTraderSalesSums(pmcProfile: IPmcData): void;
    protected addMissingBonusesProperty(pmcProfile: IPmcData): void;
    /**
     * Adjust profile quest status and statusTimers object values
     * quest.status is numeric e.g. 2
     * quest.statusTimers keys are numeric as strings e.g. "2"
     * @param pmcProfile profile to update
     */
    protected updateProfileQuestDataValues(pmcProfile: IPmcData): void;
    protected addMissingRepeatableQuestsProperty(pmcProfile: IPmcData): void;
    protected addMissingWorkbenchWeaponSkills(pmcProfile: IPmcData): void;
    /**
     * Some profiles have hideout maxed and therefore no improvements
     * @param pmcProfile Profile to add improvement data to
     */
    protected addMissingWallImprovements(pmcProfile: IPmcData): void;
    /**
     * A new property was added to slot items "locationIndex", if this is missing, the hideout slot item must be removed
     * @param pmcProfile Profile to find and remove slots from
     */
    protected removeResourcesFromSlotsInHideoutWithoutLocationIndexValue(pmcProfile: IPmcData): void;
    /**
     * Hideout slots need to be in a specific order, locationIndex in ascending order
     * @param pmcProfile profile to edit
     */
    protected reorderHideoutAreasWithResouceInputs(pmcProfile: IPmcData): void;
    /**
     * add in objects equal to the number of slots
     * @param areaType area to check
     * @param pmcProfile profile to update
     */
    protected addEmptyObjectsToHideoutAreaSlots(areaType: HideoutAreas, emptyItemCount: number, pmcProfile: IPmcData): void;
    protected addObjectsToArray(count: number, slots: HideoutSlot[]): HideoutSlot[];
    /**
     * In 18876 bsg changed the pockets tplid to be one that has 3 additional special slots
     * @param pmcProfile
     */
    protected updateProfilePocketsToNewId(pmcProfile: IPmcData): void;
    addMissingArmorRepairSkill(pmcProfile: IPmcData): void;
    /**
     * Iterate over players hideout areas and find what's build, look for missing bonuses those areas give and add them if missing
     * @param pmcProfile Profile to update
     */
    addMissingHideoutBonusesToProfile(pmcProfile: IPmcData): void;
    /**
     *
     * @param profileBonuses bonuses from profile
     * @param bonus bonus to find
     * @returns matching bonus
     */
    protected getBonusFromProfile(profileBonuses: Bonus[], bonus: StageBonus): Bonus;
    /**
     * Checks profile inventiory for items that do not exist inside the items db
     * @param pmcProfile Profile to check inventory of
     */
    checkForOrphanedModdedItems(pmcProfile: IPmcData): void;
    /**
     * Add `Improvements` object to hideout if missing - added in eft 13.0.21469
     * @param pmcProfile profile to update
     */
    addMissingUpgradesPropertyToHideout(pmcProfile: IPmcData): void;
    /**
     * Iterate over associated profile template and check all hideout areas exist, add if not
     * @param fullProfile Profile to update
     */
    addMissingHideoutAreasToProfile(fullProfile: IAkiProfile): void;
    /**
     * These used to be used for storing scav case rewards, rewards are now generated on pickup
     * @param pmcProfile Profile to update
     */
    removeLegacyScavCaseProductionCrafts(pmcProfile: IPmcData): void;
}
