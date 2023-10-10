import { HideoutAreas } from "../../../enums/HideoutAreas";
import { MemberCategory } from "../../../enums/MemberCategory";
import { QuestStatus } from "../../../enums/QuestStatus";
import { IRagfairOffer } from "../../ragfair/IRagfairOffer";
import { Item, Upd } from "./IItem";
import { IPmcDataRepeatableQuest } from "./IRepeatableQuests";
export interface IBotBase {
    _id: string;
    aid: number;
    /** SPT property - use to store player id - TODO - move to AID ( account id as guid of choice) */
    sessionId: string;
    savage?: string;
    Info: Info;
    Customization: Customization;
    Health: Health;
    Inventory: Inventory;
    Skills: Skills;
    Stats: Stats;
    Encyclopedia: Record<string, boolean>;
    ConditionCounters: ConditionCounters;
    BackendCounters: Record<string, BackendCounter>;
    InsuredItems: InsuredItem[];
    Hideout: Hideout;
    Quests: IQuestStatus[];
    TradersInfo: Record<string, TraderInfo>;
    UnlockedInfo: IUnlockedInfo;
    RagfairInfo: RagfairInfo;
    RepeatableQuests: IPmcDataRepeatableQuest[];
    Bonuses: Bonus[];
    Notes: Notes;
    CarExtractCounts: CarExtractCounts;
    SurvivorClass: SurvivorClass;
    WishList: string[];
    /** SPT specific property used during bot generation in raid */
    sptIsPmc?: boolean;
}
export interface IUnlockedInfo {
    unlockedProductionRecipe: string[];
}
export interface Info {
    EntryPoint: string;
    Nickname: string;
    LowerNickname: string;
    Side: string;
    SquadInviteRestriction: boolean;
    Voice: string;
    Level: number;
    Experience: number;
    RegistrationDate: number;
    GameVersion: string;
    AccountType: number;
    MemberCategory: MemberCategory;
    lockedMoveCommands: boolean;
    SavageLockTime: number;
    LastTimePlayedAsSavage: number;
    Settings: Settings;
    NicknameChangeDate: number;
    NeedWipeOptions: any[];
    lastCompletedWipe: LastCompleted;
    Bans: IBan[];
    BannedState: boolean;
    BannedUntil: number;
    IsStreamerModeAvailable: boolean;
    lastCompletedEvent?: LastCompleted;
}
export interface Settings {
    Role: string;
    BotDifficulty: string;
    Experience: number;
    StandingForKill: number;
    AggressorBonus: number;
}
export interface IBan {
    type: BanType;
    dateTime: number;
}
export declare enum BanType {
    CHAT = 0,
    RAGFAIR = 1,
    VOIP = 2,
    TRADING = 3,
    ONLINE = 4,
    FRIENDS = 5,
    CHANGE_NICKNAME = 6
}
export interface Customization {
    Head: string;
    Body: string;
    Feet: string;
    Hands: string;
}
export interface Health {
    Hydration: CurrentMax;
    Energy: CurrentMax;
    Temperature: CurrentMax;
    BodyParts: BodyPartsHealth;
    UpdateTime: number;
}
export interface BodyPartsHealth {
    Head: BodyPartHealth;
    Chest: BodyPartHealth;
    Stomach: BodyPartHealth;
    LeftArm: BodyPartHealth;
    RightArm: BodyPartHealth;
    LeftLeg: BodyPartHealth;
    RightLeg: BodyPartHealth;
}
export interface BodyPartHealth {
    Health: CurrentMax;
    Effects?: Record<string, BodyPartEffectProperties>;
}
export interface BodyPartEffectProperties {
    Time: number;
}
export interface CurrentMax {
    Current: number;
    Maximum: number;
}
export interface Inventory {
    items: Item[];
    equipment: string;
    stash: string;
    sortingTable: string;
    questRaidItems: string;
    questStashItems: string;
    /** Key is hideout area enum numeric as string e.g. "24", value is area _id  */
    hideoutAreaStashes: Record<string, string>;
    fastPanel: Record<string, string>;
}
export interface IBaseJsonSkills {
    Common: Record<string, Common>;
    Mastering: Record<string, Mastering>;
    Points: number;
}
export interface Skills {
    Common: Common[];
    Mastering: Mastering[];
    Points: number;
}
export interface IBaseSkill {
    Id: string;
    Progress: number;
    max?: number;
    min?: number;
}
export interface Common extends IBaseSkill {
    PointsEarnedDuringSession?: number;
    LastAccess?: number;
}
export interface Mastering extends IBaseSkill {
}
export interface Stats {
    Eft: IEftStats;
}
export interface IEftStats {
    CarriedQuestItems: string[];
    Victims: Victim[];
    TotalSessionExperience: number;
    LastSessionDate: number;
    SessionCounters: SessionCounters;
    OverallCounters: OverallCounters;
    SessionExperienceMult?: number;
    ExperienceBonusMult?: number;
    Aggressor?: Aggressor;
    DroppedItems?: IDroppedItem[];
    FoundInRaidItems?: FoundInRaidItem[];
    DamageHistory?: DamageHistory;
    DeathCause?: DeathCause;
    LastPlayerState?: LastPlayerState;
    TotalInGameTime: number;
    SurvivorClass?: string;
}
export interface IDroppedItem {
    QuestId: string;
    ItemId: string;
    ZoneId: string;
}
export interface FoundInRaidItem {
    QuestId: string;
    ItemId: string;
}
export interface Victim {
    AccountId: string;
    ProfileId: string;
    Name: string;
    Side: string;
    BodyPart: string;
    Time: string;
    Distance: number;
    Level: number;
    Weapon: string;
    Role: string;
}
export interface SessionCounters {
    Items: CounterKeyValue[];
}
export interface OverallCounters {
    Items: CounterKeyValue[];
}
export interface CounterKeyValue {
    Key: string[];
    Value: number;
}
export interface ConditionCounters {
    Counters: Counter[];
}
export interface Counter {
    id: string;
    value: number;
    qid: string;
}
export interface Aggressor {
    AccountId: string;
    ProfileId: string;
    MainProfileNickname: string;
    Name: string;
    Side: string;
    BodyPart: string;
    HeadSegment: string;
    WeaponName: string;
    Category: string;
}
export interface DamageHistory {
    LethalDamagePart: string;
    LethalDamage: LethalDamage;
    BodyParts: BodyPartsDamageHistory;
}
export interface LethalDamage {
    Amount: number;
    Type: string;
    SourceId: string;
    OverDamageFrom: string;
    Blunt: boolean;
    ImpactsCount: number;
}
export interface BodyPartsDamageHistory {
    Head: DamageStats[];
    Chest: DamageStats[];
    Stomach: DamageStats[];
    LeftArm: DamageStats[];
    RightArm: DamageStats[];
    LeftLeg: DamageStats[];
    RightLeg: DamageStats[];
    Common: DamageStats[];
}
export interface DamageStats {
    Amount: number;
    Type: string;
    SourceId: string;
    OverDamageFrom: string;
    Blunt: boolean;
    ImpactsCount: number;
}
export interface DeathCause {
    DamageType: string;
    Side: string;
    Role: string;
    WeaponId: string;
}
export interface LastPlayerState {
    Info: LastPlayerStateInfo;
    Customization: Record<string, string>;
    Equipment: any;
}
export interface LastPlayerStateInfo {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
}
export interface BackendCounter {
    id: string;
    qid?: string;
    value: number;
}
export interface InsuredItem {
    /** Trader Id item was insured by */
    tid: string;
    itemId: string;
}
export interface Hideout {
    Production: Record<string, Productive>;
    Areas: HideoutArea[];
    Improvement: Record<string, IHideoutImprovement>;
    Seed: number;
    sptUpdateLastRunTimestamp: number;
}
export interface IHideoutImprovement {
    completed: boolean;
    improveCompleteTimestamp: number;
}
export interface Productive {
    Products: Product[];
    /** Seconds passed of production */
    Progress?: number;
    /** Is craft in some state of being worked on by client (crafting/ready to pick up) */
    inProgress?: boolean;
    StartTimestamp?: number;
    SkipTime?: number;
    /** Seconds needed to fully craft */
    ProductionTime?: number;
    GivenItemsInStart?: string[];
    Interrupted?: boolean;
    /** Used in hideout prodiction.json */
    needFuelForAllProductionTime?: boolean;
    /** Used when sending data to client */
    NeedFuelForAllProductionTime?: boolean;
    sptIsScavCase?: boolean;
}
export interface Production extends Productive {
    RecipeId: string;
    SkipTime: number;
    ProductionTime: number;
}
export interface ScavCase extends Productive {
    RecipeId: string;
}
export interface Product {
    _id: string;
    _tpl: string;
    upd?: Upd;
}
export interface HideoutArea {
    type: HideoutAreas;
    level: number;
    active: boolean;
    passiveBonusesEnabled: boolean;
    completeTime: number;
    constructing: boolean;
    slots: HideoutSlot[];
    lastRecipe: string;
}
export interface HideoutSlot {
    /** SPT specific value to keep track of what index this slot is (0,1,2,3 etc) */
    locationIndex: number;
    item?: HideoutItem[];
}
export interface HideoutItem {
    _id: string;
    _tpl: string;
    upd?: Upd;
}
export interface LastCompleted {
    $oid: string;
}
export interface Notes {
    Notes: Note[];
}
export interface CarExtractCounts {
}
export declare enum SurvivorClass {
    UNKNOWN = 0,
    NEUTRALIZER = 1,
    MARAUDER = 2,
    PARAMEDIC = 3,
    SURVIVOR = 4
}
export interface IQuestStatus {
    qid: string;
    startTime: number;
    status: QuestStatus;
    statusTimers?: Record<string, number>;
    /** SPT specific property */
    completedConditions?: string[];
    availableAfter?: number;
}
export interface TraderInfo {
    loyaltyLevel: number;
    salesSum: number;
    standing: number;
    nextResupply: number;
    unlocked: boolean;
    disabled: boolean;
}
/** This object is sent to the client as part of traderRelations */
export interface TraderData {
    salesSum: number;
    standing: number;
    loyalty: number;
    unlocked: boolean;
    disabled: boolean;
}
export interface RagfairInfo {
    rating: number;
    isRatingGrowing: boolean;
    offers: IRagfairOffer[];
}
export interface Bonus {
    id?: string;
    type: string;
    templateId?: string;
    passive?: boolean;
    production?: boolean;
    visible?: boolean;
    value?: number;
    icon?: string;
    filter?: string[];
    skillType?: string;
}
export interface Note {
    Time: number;
    Text: string;
}
