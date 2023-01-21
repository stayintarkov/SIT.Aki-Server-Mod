import { Item } from "./tables/IItem";
export interface IGlobals {
    time: number;
    config: Config;
    bot_presets: BotPreset[];
    BotWeaponScatterings: BotWeaponScattering[];
    ItemPresets: Record<string, Preset>;
}
export interface Config {
    content: Content;
    AimPunchMagnitude: number;
    WeaponSkillProgressRate: number;
    SkillAtrophy: boolean;
    exp: Exp;
    t_base_looting: number;
    t_base_lockpicking: number;
    armor: Armor;
    SessionsToShowHotKeys: number;
    MaxBotsAliveOnMap: number;
    SavagePlayCooldown: number;
    SavagePlayCooldownNdaFree: number;
    MarksmanAccuracy: number;
    SavagePlayCooldownDevelop: number;
    TODSkyDate: string;
    Mastering: Mastering[];
    GlobalItemPriceModifier: number;
    TradingUnlimitedItems: boolean;
    MaxLoyaltyLevelForAll: boolean;
    GlobalLootChanceModifier: number;
    TimeBeforeDeploy: number;
    TimeBeforeDeployLocal: number;
    LoadTimeSpeedProgress: number;
    BaseLoadTime: number;
    BaseUnloadTime: number;
    BaseCheckTime: number;
    Customization: Customization;
    UncheckOnShot: boolean;
    BotsEnabled: boolean;
    ArmorMaterials: ArmorMaterials;
    LegsOverdamage: number;
    HandsOverdamage: number;
    StomachOverdamage: number;
    Health: Health;
    rating: Rating;
    tournament: Tournament;
    RagFair: RagFair;
    handbook: Handbook;
    FractureCausedByFalling: Probability;
    FractureCausedByBulletHit: Probability;
    WAVE_COEF_LOW: number;
    WAVE_COEF_MID: number;
    WAVE_COEF_HIGH: number;
    WAVE_COEF_HORDE: number;
    Stamina: Stamina;
    StaminaRestoration: StaminaRestoration;
    StaminaDrain: StaminaDrain;
    RequirementReferences: RequirementReferences;
    RepairKitSettings: RepairKitSettings;
    RestrictionsInRaid: RestrictionsInRaid[];
    SkillMinEffectiveness: number;
    SkillFatiguePerPoint: number;
    SkillFreshEffectiveness: number;
    SkillFreshPoints: number;
    SkillPointsBeforeFatigue: number;
    SkillFatigueReset: number;
    DiscardLimitsEnabled: boolean;
    EventType: string[];
    WalkSpeed: xyz;
    SprintSpeed: xyz;
    SkillEnduranceWeightThreshold: number;
    TeamSearchingTimeout: number;
    Insurance: Insurance;
    SkillExpPerLevel: number;
    GameSearchingTimeout: number;
    WallContusionAbsorption: xyz;
    SkillsSettings: SkillsSettings;
    AzimuthPanelShowsPlayerOrientation: boolean;
    Aiming: Aiming;
    Malfunction: Malfunction;
    Overheat: Overheat;
    FenceSettings: FenceSettings;
    TestValue: number;
    Inertia: Inertia;
    Ballistic: Ballistic;
}
export interface Content {
    ip: string;
    port: number;
    root: string;
}
export interface Exp {
    heal: Heal;
    match_end: MatchEnd;
    kill: Kill;
    level: Level;
    loot_attempts: LootAttempt[];
    expForLockedDoorOpen: number;
    expForLockedDoorBreach: number;
    triggerMult: number;
}
export interface Heal {
    expForHeal: number;
    expForHydration: number;
    expForEnergy: number;
}
export interface MatchEnd {
    README: string;
    survived_exp_requirement: number;
    survived_seconds_requirement: number;
    survived_exp_reward: number;
    mia_exp_reward: number;
    runner_exp_reward: number;
    leftMult: number;
    miaMult: number;
    survivedMult: number;
    runnerMult: number;
    killedMult: number;
}
export interface Kill {
    combo: Combo[];
    victimLevelExp: number;
    headShotMult: number;
    expOnDamageAllHealth: number;
    longShotDistance: number;
    bloodLossToLitre: number;
    victimBotLevelExp: number;
}
export interface Combo {
    percent: number;
}
export interface Level {
    exp_table: ExpTable[];
    trade_level: number;
    savage_level: number;
    clan_level: number;
    mastering1: number;
    mastering2: number;
}
export interface ExpTable {
    exp: number;
}
export interface LootAttempt {
    k_exp: number;
}
export interface Armor {
    class: Class[];
}
export interface Class {
    resistance: number;
}
export interface Mastering {
    Name: string;
    Templates: string[];
    Level2: number;
    Level3: number;
}
export interface Customization {
    SavageHead: SavageHead;
    SavageBody: SavageBody;
    SavageFeet: SavageFeet;
    CustomizationVoice: CustomizationVoice[];
    BodyParts: BodyParts;
}
export interface SavageHead {
    wild_head_1: WildHead;
    wild_head_2: WildHead;
    wild_head_3: WildHead;
    Wild_Dealmaker_head: WildHead;
    Wild_Killa_head: WildHead;
    bear_head: WildHead;
    bear_head_1: WildHead;
    usec_head_1: WildHead;
    Head_BOSS_Glukhar: WildHead;
    Wild_Head_nonMesh: WildHead;
    Head_BOSS_Sanitar: WildHead;
    wild_head_drozd: WildHead;
    wild_head_misha: WildHead;
    head_cultist_01: WildHead;
    head_cultist_02: WildHead;
    head_cultist_03: WildHead;
    DefaultUsecHead: WildHead;
    usec_head_3: WildHead;
    usec_head_4: WildHead;
    usec_head_5: WildHead;
}
export interface WildHead {
    head: string;
    isNotRandom: boolean;
    NotRandom: boolean;
}
export interface SavageBody {
    wild_body: WildBody;
    wild_body_1: WildBody;
    wild_body_2: WildBody;
    wild_body_3: WildBody;
    Wild_Dealmaker_body: WildBody;
    wild_security_body_1: WildBody;
    wild_security_body_2: WildBody;
    wild_Killa_body: WildBody;
    wild_pmcBot_body: WildBody;
    wild_Shturman_body: WildBody;
    wild_Gluhar_body: WildBody;
    Tshirt_security_TshirtTatu_01: WildBody;
    Tshirt_security_TshirtTatu_02: WildBody;
    Top_security_Husky: WildBody;
    Top_security_Gorka4: WildBody;
    scav_kit_upper_meteor: WildBody;
    wild_body_russia1: WildBody;
    Top_BOSS_Sanitar: WildBody;
    wild_body_motocross: WildBody;
    top_cultist_01: WildBody;
    top_cultist_02: WildBody;
    wild_body_rainparka: WildBody;
    wild_body_underarmour: WildBody;
    top_boss_tagilla: WildBody;
    DefaultUsecBody: WildBody;
    usec_upper_acu: WildBody;
    usec_upper_commando: WildBody;
    usec_upper_aggressor: WildBody;
    usec_upper_hoody: WildBody;
    usec_upper_pcuironsight: WildBody;
    usec_top_beltstaff: WildBody;
    usec_upper_flexion: WildBody;
    usec_upper_tier3: WildBody;
    usec_upper_pcsmulticam: WildBody;
    usec_upper_tier_2: WildBody;
    usec_upper_infiltrator: WildBody;
    user_upper_NightPatrol: WildBody;
    wild_body_bomber: WildBody;
    wild_top_yellowcoat: WildBody;
}
export interface WildBody {
    body: string;
    hands: string;
    isNotRandom: boolean;
}
export interface SavageFeet {
    wild_feet: WildFeet;
    wild_feet_1: WildFeet;
    wild_feet_2: WildFeet;
    Wild_Dealmaker_feet: WildFeet;
    wild_security_feet_1: WildFeet;
    Wild_Killa_feet: WildFeet;
    wild_pmcBot_feet: WildFeet;
    Pants_BOSS_Glukhar: WildFeet;
    Pants_BOSS_Shturman: WildFeet;
    Pants_security_Gorka4: WildFeet;
    Pants_security_Flora: WildFeet;
    scav_kit_lower_sklon: WildFeet;
    Pants_BOSS_Sanitar: WildFeet;
    wild_feet_sweatpants: WildFeet;
    wild_feet_wasatch: WildFeet;
    wild_feet_slimPants: WildFeet;
    pants_cultist_01: WildFeet;
    pants_cultist_02: WildFeet;
    wild_feet_scavelite_taclite: WildFeet;
    pants_boss_tagilla: WildFeet;
    wild_feet_bomber: WildFeet;
    wild_pants_yellowcoat: WildFeet;
}
export interface WildFeet {
    feet: string;
    isNotRandom: boolean;
    NotRandom: boolean;
}
export interface CustomizationVoice {
    voice: string;
    side: string[];
    isNotRandom: boolean;
}
export interface BodyParts {
    Head: string;
    Body: string;
    Feet: string;
    Hands: string;
}
export interface ArmorMaterials {
    UHMWPE: ArmorType;
    Aramid: ArmorType;
    Combined: ArmorType;
    Titan: ArmorType;
    Aluminium: ArmorType;
    ArmoredSteel: ArmorType;
    Ceramic: ArmorType;
    Glass: ArmorType;
}
export interface ArmorType {
    Destructibility: number;
    MinRepairDegradation: number;
    MaxRepairDegradation: number;
    ExplosionDestructibility: number;
    MinRepairKitDegradation: number;
    MaxRepairKitDegradation: number;
}
export interface Health {
    Falling: Falling;
    Effects: Effects;
    HealPrice: HealPrice;
    ProfileHealthSettings: ProfileHealthSettings;
}
export interface Falling {
    DamagePerMeter: number;
    SafeHeight: number;
}
export interface Effects {
    Existence: Existence;
    Dehydration: Dehydration;
    BreakPart: BreakPart;
    Contusion: Contusion;
    Disorientation: Disorientation;
    Exhaustion: Exhaustion;
    LowEdgeHealth: LowEdgeHealth;
    RadExposure: RadExposure;
    Stun: Stun;
    Intoxication: Intoxication;
    Regeneration: Regeneration;
    Wound: Wound;
    Berserk: Berserk;
    Flash: Flash;
    MedEffect: MedEffect;
    Pain: Pain;
    PainKiller: PainKiller;
    SandingScreen: SandingScreen;
    Stimulator: Stimulator;
    Tremor: Tremor;
    ChronicStaminaFatigue: ChronicStaminaFatigue;
    Fracture: Fracture2;
    HeavyBleeding: HeavyBleeding2;
    LightBleeding: LightBleeding2;
    BodyTemperature: BodyTemperature;
}
export interface Existence {
    EnergyLoopTime: number;
    HydrationLoopTime: number;
    EnergyDamage: number;
    HydrationDamage: number;
    DestroyedStomachEnergyTimeFactor: number;
    DestroyedStomachHydrationTimeFactor: number;
}
export interface Dehydration {
    DefaultDelay: number;
    DefaultResidueTime: number;
    BleedingHealth: number;
    BleedingLoopTime: number;
    BleedingLifeTime: number;
    DamageOnStrongDehydration: number;
    StrongDehydrationLoopTime: number;
}
export interface BreakPart {
    DefaultDelay: number;
    DefaultResidueTime: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    BulletHitProbability: Probability;
    FallingProbability: Probability;
}
export interface Contusion {
    Dummy: number;
}
export interface Disorientation {
    Dummy: number;
}
export interface Exhaustion {
    DefaultDelay: number;
    DefaultResidueTime: number;
    Damage: number;
    DamageLoopTime: number;
}
export interface LowEdgeHealth {
    DefaultDelay: number;
    DefaultResidueTime: number;
    StartCommonHealth: number;
}
export interface RadExposure {
    Damage: number;
    DamageLoopTime: number;
}
export interface Stun {
    Dummy: number;
}
export interface Intoxication {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageHealth: number;
    HealthLoopTime: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovedAfterDeath: boolean;
    HealExperience: number;
    RemovePrice: number;
}
export interface Regeneration {
    LoopTime: number;
    MinimumHealthPercentage: number;
    Energy: number;
    Hydration: number;
    BodyHealth: BodyHealth;
    Influences: Influences;
}
export interface BodyHealth {
    Head: BodyHealthValue;
    Chest: BodyHealthValue;
    Stomach: BodyHealthValue;
    LeftArm: BodyHealthValue;
    RightArm: BodyHealthValue;
    LeftLeg: BodyHealthValue;
    RightLeg: BodyHealthValue;
}
export interface BodyHealthValue {
    Value: number;
}
export interface Influences {
    LightBleeding: Influence;
    HeavyBleeding: Influence;
    Fracture: Influence;
    RadExposure: Influence;
    Intoxication: Influence;
}
export interface Influence {
    HealthSlowDownPercentage: number;
    EnergySlowDownPercentage: number;
    HydrationSlowDownPercentage: number;
}
export interface Wound {
    WorkingTime: number;
    ThresholdMin: number;
    ThresholdMax: number;
}
export interface Berserk {
    DefaultDelay: number;
    WorkingTime: number;
    DefaultResidueTime: number;
}
export interface Flash {
    Dummy: number;
}
export interface MedEffect {
    LoopTime: number;
    StartDelay: number;
    DrinkStartDelay: number;
    FoodStartDelay: number;
    DrugsStartDelay: number;
    MedKitStartDelay: number;
    MedicalStartDelay: number;
    StimulatorStartDelay: number;
}
export interface Pain {
    TremorDelay: number;
    HealExperience: number;
}
export interface PainKiller {
    Dummy: number;
}
export interface SandingScreen {
    Dummy: number;
}
export interface Stimulator {
    BuffLoopTime: number;
    Buffs: Buffs;
}
export interface Buffs {
    BuffsSJ1TGLabs: Buff[];
    BuffsSJ6TGLabs: Buff[];
    BuffsPropital: Buff[];
    BuffsZagustin: Buff[];
    BuffseTGchange: Buff[];
    BuffsAdrenaline: Buff[];
    BuffsGoldenStarBalm: Buff[];
    Buffs_drink_aquamari: Buff[];
    Buffs_drink_maxenergy: Buff[];
    Buffs_drink_milk: Buff[];
    Buffs_drink_tarcola: Buff[];
    Buffs_drink_hotrod: Buff[];
    Buffs_drink_juice_army: Buff[];
    Buffs_drink_water: Buff[];
    Buffs_food_borodinskiye: Buff[];
    Buffs_food_condensed_milk: Buff[];
    Buffs_food_emelya: Buff[];
    Buffs_food_mayonez: Buff[];
    Buffs_food_mre: Buff[];
    Buffs_food_sugar: Buff[];
    Buffs_drink_vodka: Buff[];
    Buffs_drink_jack: Buff[];
    Buffs_drink_moonshine: Buff[];
    Buffs_drink_purewater: Buff[];
    Buffs_3bTG: Buff[];
    Buffs_AHF1M: Buff[];
    Buffs_L1: Buff[];
    Buffs_MULE: Buff[];
    Buffs_Meldonin: Buff[];
    Buffs_Obdolbos: Buff[];
    Buffs_P22: Buff[];
    Buffs_KultistsToxin: Buff[];
    Buffs_BodyTemperature: Buff[];
    Buffs_Antidote: Buff[];
    Buffs_melee_bleed: Buff[];
    Buffs_melee_blunt: Buff[];
    Buffs_hultafors: Buff[];
    Buffs_drink_vodka_BAD: Buff[];
    Buffs_food_alyonka: Buff[];
    Buffs_food_slippers: Buff[];
    Buffs_knife: Buff[];
}
export interface Buff {
    BuffType: string;
    Chance: number;
    Delay: number;
    Duration: number;
    Value: number;
    AbsoluteValue: boolean;
    SkillName: string;
}
export interface Tremor {
    DefaultDelay: number;
    DefaultResidueTime: number;
}
export interface ChronicStaminaFatigue {
    EnergyRate: number;
    WorkingTime: number;
    TicksEvery: number;
    EnergyRatePerStack: number;
}
export interface Fracture2 {
    DefaultDelay: number;
    DefaultResidueTime: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    BulletHitProbability: Probability;
    FallingProbability: Probability;
}
export interface HeavyBleeding2 {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageEnergy: number;
    DamageHealth: number;
    EnergyLoopTime: number;
    HealthLoopTime: number;
    DamageHealthDehydrated: number;
    HealthLoopTimeDehydrated: number;
    LifeTimeDehydrated: number;
    EliteVitalityDuration: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    Probability: Probability;
}
export interface Probability {
    FunctionType: string;
    K: number;
    B: number;
    Threshold: number;
}
export interface LightBleeding2 {
    DefaultDelay: number;
    DefaultResidueTime: number;
    DamageEnergy: number;
    DamageHealth: number;
    EnergyLoopTime: number;
    HealthLoopTime: number;
    DamageHealthDehydrated: number;
    HealthLoopTimeDehydrated: number;
    LifeTimeDehydrated: number;
    EliteVitalityDuration: number;
    HealExperience: number;
    OfflineDurationMin: number;
    OfflineDurationMax: number;
    RemovePrice: number;
    RemovedAfterDeath: boolean;
    Probability: Probability;
}
export interface BodyTemperature {
    DefaultBuildUpTime: number;
    DefaultResidueTime: number;
    LoopTime: number;
}
export interface HealPrice {
    HealthPointPrice: number;
    HydrationPointPrice: number;
    EnergyPointPrice: number;
    TrialLevels: number;
    TrialRaids: number;
}
export interface ProfileHealthSettings {
    BodyPartsSettings: BodyPartsSettings;
    HealthFactorsSettings: HealthFactorsSettings;
    DefaultStimulatorBuff: string;
}
export interface BodyPartsSettings {
    Head: BodyPartsSetting;
    Chest: BodyPartsSetting;
    Stomach: BodyPartsSetting;
    LeftArm: BodyPartsSetting;
    RightArm: BodyPartsSetting;
    LeftLeg: BodyPartsSetting;
    RightLeg: BodyPartsSetting;
}
export interface BodyPartsSetting {
    Minimum: number;
    Maximum: number;
    Default: number;
    OverDamageReceivedMultiplier: number;
}
export interface HealthFactorsSettings {
    Energy: HealthFactorSetting;
    Hydration: HealthFactorSetting;
    Temperature: HealthFactorSetting;
    Poisoning: HealthFactorSetting;
    Radiation: HealthFactorSetting;
}
export interface HealthFactorSetting {
    Minimum: number;
    Maximum: number;
    Default: number;
}
export interface Rating {
    levelRequired: number;
    limit: number;
    categories: Categories;
}
export interface Categories {
    experience: boolean;
    kd: boolean;
    surviveRatio: boolean;
    avgEarnings: boolean;
    kills: boolean;
    raidCount: boolean;
    longestShot: boolean;
    timeOnline: boolean;
    inventoryFullCost: boolean;
    ragFairStanding: boolean;
}
export interface Tournament {
    categories: Categories2;
    limit: number;
    levelRequired: number;
}
export interface Categories2 {
    dogtags: boolean;
}
export interface RagFair {
    enabled: boolean;
    priceStabilizerEnabled: boolean;
    includePveTraderSales: boolean;
    priceStabilizerStartIntervalInHours: number;
    minUserLevel: number;
    communityTax: number;
    communityItemTax: number;
    communityRequirementTax: number;
    offerPriorityCost: number;
    offerDurationTimeInHour: number;
    offerDurationTimeInHourAfterRemove: number;
    priorityTimeModifier: number;
    maxRenewOfferTimeInHour: number;
    renewPricePerHour: number;
    maxActiveOfferCount: MaxActiveOfferCount[];
    balancerRemovePriceCoefficient: number;
    balancerMinPriceCount: number;
    balancerAveragePriceCoefficient: number;
    delaySinceOfferAdd: number;
    uniqueBuyerTimeoutInDays: number;
    ratingSumForIncrease: number;
    ratingIncreaseCount: number;
    ratingSumForDecrease: number;
    ratingDecreaseCount: number;
    maxSumForIncreaseRatingPerOneSale: number;
    maxSumForDecreaseRatingPerOneSale: number;
    maxSumForRarity: MaxSumForRarity;
    ChangePriceCoef: number;
    balancerUserItemSaleCooldownEnabled: boolean;
    balancerUserItemSaleCooldown: number;
    youSellOfferMaxStorageTimeInHour: number;
    yourOfferDidNotSellMaxStorageTimeInHour: number;
    isOnlyFoundInRaidAllowed: boolean;
    sellInOnePiece: number;
}
export interface MaxActiveOfferCount {
    from: number;
    to: number;
    count: number;
}
export interface MaxSumForRarity {
    Common: RarityMaxSum;
    Rare: RarityMaxSum;
    Superrare: RarityMaxSum;
    Not_exist: RarityMaxSum;
}
export interface RarityMaxSum {
    value: number;
}
export interface Handbook {
    defaultCategory: string;
}
export interface Stamina {
    Capacity: number;
    SprintDrainRate: number;
    BaseRestorationRate: number;
    JumpConsumption: number;
    GrenadeHighThrow: number;
    GrenadeLowThrow: number;
    AimDrainRate: number;
    AimRangeFinderDrainRate: number;
    OxygenCapacity: number;
    OxygenRestoration: number;
    WalkOverweightLimits: xyz;
    BaseOverweightLimits: xyz;
    SprintOverweightLimits: xyz;
    WalkSpeedOverweightLimits: xyz;
    CrouchConsumption: xyz;
    WalkConsumption: xyz;
    StandupConsumption: xyz;
    TransitionSpeed: xyz;
    SprintAccelerationLowerLimit: number;
    SprintSpeedLowerLimit: number;
    SprintSensitivityLowerLimit: number;
    AimConsumptionByPose: xyz;
    RestorationMultiplierByPose: xyz;
    OverweightConsumptionByPose: xyz;
    AimingSpeedMultiplier: number;
    WalkVisualEffectMultiplier: number;
    HandsCapacity: number;
    HandsRestoration: number;
    ProneConsumption: number;
    BaseHoldBreathConsumption: number;
    SoundRadius: xyz;
    ExhaustedMeleeSpeed: number;
    FatigueRestorationRate: number;
    FatigueAmountToCreateEffect: number;
    ExhaustedMeleeDamageMultiplier: number;
    FallDamageMultiplier: number;
    SafeHeightOverweight: number;
    SitToStandConsumption: number;
    StaminaExhaustionCausesJiggle: boolean;
    StaminaExhaustionStartsBreathSound: boolean;
    StaminaExhaustionRocksCamera: boolean;
    HoldBreathStaminaMultiplier: xyz;
    PoseLevelIncreaseSpeed: xyz;
    PoseLevelDecreaseSpeed: xyz;
    PoseLevelConsumptionPerNotch: xyz;
}
export interface StaminaRestoration {
    LowerLeftPoint: number;
    LowerRightPoint: number;
    LeftPlatoPoint: number;
    RightPlatoPoint: number;
    RightLimit: number;
    ZeroValue: number;
}
export interface StaminaDrain {
    LowerLeftPoint: number;
    LowerRightPoint: number;
    LeftPlatoPoint: number;
    RightPlatoPoint: number;
    RightLimit: number;
    ZeroValue: number;
}
export interface RequirementReferences {
    Alpinist: Alpinist[];
}
export interface Alpinist {
    Requirement: string;
    Id: string;
    Count: number;
    RequiredSlot: string;
    RequirementTip: string;
}
export interface RestrictionsInRaid {
    TemplateId: string;
    Value: number;
}
export interface Insurance {
    MaxStorageTimeInHour: number;
}
export interface SkillsSettings {
    SkillProgressRate: number;
    WeaponSkillProgressRate: number;
    WeaponSkillRecoilBonusPerLevel: number;
    HideoutManagement: HideoutManagement;
    Crafting: Crafting;
    Metabolism: Metabolism;
    Immunity: Immunity;
    Endurance: Endurance;
    Strength: Strength;
    Vitality: Vitality;
    Health: Health2;
    StressResistance: StressResistance;
    Throwing: Throwing;
    RecoilControl: RecoilControl;
    Pistol: WeaponSkills;
    Revolver: WeaponSkills;
    SMG: any[];
    Assault: WeaponSkills;
    Shotgun: WeaponSkills;
    Sniper: WeaponSkills;
    LMG: any[];
    HMG: any[];
    Launcher: any[];
    AttachedLauncher: any[];
    Melee: any[];
    DMR: WeaponSkills;
    BearAssaultoperations: any[];
    BearAuthority: any[];
    BearAksystems: any[];
    BearHeavycaliber: any[];
    BearRawpower: any[];
    UsecArsystems: any[];
    UsecDeepweaponmodding_Settings: any[];
    UsecLongrangeoptics_Settings: any[];
    UsecNegotiations: any[];
    UsecTactics: any[];
    BotReload: any[];
    CovertMovement: CovertMovement;
    FieldMedicine: any[];
    Search: Search;
    Sniping: any[];
    ProneMovement: any[];
    FirstAid: any[];
    LightVests: ArmorSkills;
    HeavyVests: ArmorSkills;
    WeaponModding: any[];
    AdvancedModding: any[];
    NightOps: any[];
    SilentOps: any[];
    Lockpicking: any[];
    WeaponTreatment: WeaponTreatment;
    MagDrills: MagDrills;
    Freetrading: any[];
    Auctions: any[];
    Cleanoperations: any[];
    Barter: any[];
    Shadowconnections: any[];
    Taskperformance: any[];
    Perception: Perception;
    Intellect: Intellect;
    Attention: Attention;
    Charisma: Charisma;
    Memory: Memory;
    Surgery: Surgery;
    AimDrills: AimDrills;
    BotSound: any[];
    TroubleShooting: TroubleShooting;
}
export interface ArmorSkills {
    WearAmountRepairLVestsReducePerLevel: number;
    WearChanceRepairLVestsReduceEliteLevel: number;
}
export interface HideoutManagement {
    SkillPointsPerAreaUpgrade: number;
    SkillPointsPerCraft: number;
    ConsumptionReductionPerLevel: number;
    SkillBoostPercent: number;
    SkillPointsRate: SkillPointsRate;
    EliteSlots: EliteSlots;
}
export interface SkillPointsRate {
    Generator: Generator;
    AirFilteringUnit: SkillPointRate;
    WaterCollector: SkillPointRate;
    SolarPower: SkillPointRate;
}
export interface SkillPointRate {
    ResourceSpent: number;
    PointsGained: number;
}
export interface EliteSlots {
    Generator: EliteSlot;
    AirFilteringUnit: EliteSlot;
    WaterCollector: EliteSlot;
    BitcoinFarm: EliteSlot;
}
export interface EliteSlot {
    Slots: number;
    Container: number;
}
export interface Crafting {
    PointsPerCraftingCycle: number;
    CraftingCycleHours: number;
    PointsPerUniqueCraftCycle: number;
    UniqueCraftsPerCycle: number;
    CraftTimeReductionPerLevel: number;
    ProductionTimeReductionPerLevel: number;
    EliteExtraProductions: number;
    CraftingPointsToInteligence: number;
}
export interface Metabolism {
    HydrationRecoveryRate: number;
    EnergyRecoveryRate: number;
    IncreasePositiveEffectDurationRate: number;
    DecreaseNegativeEffectDurationRate: number;
    DecreasePoisonDurationRate: number;
}
export interface Immunity {
    ImmunityMiscEffects: number;
    ImmunityPoisonBuff: number;
    ImmunityPainKiller: number;
    HealthNegativeEffect: number;
    StimulatorNegativeBuff: number;
}
export interface Endurance {
    MovementAction: number;
    SprintAction: number;
    GainPerFatigueStack: number;
}
export interface Strength {
    SprintActionMin: number;
    SprintActionMax: number;
    MovementActionMin: number;
    MovementActionMax: number;
    PushUpMin: number;
    PushUpMax: number;
    FistfightAction: number;
    ThrowAction: number;
}
export interface Vitality {
    DamageTakenAction: number;
    HealthNegativeEffect: number;
}
export interface Health2 {
    SkillProgress: number;
}
export interface StressResistance {
    HealthNegativeEffect: number;
    LowHPDuration: number;
}
export interface Throwing {
    ThrowAction: number;
}
export interface RecoilControl {
    RecoilAction: number;
    RecoilBonusPerLevel: number;
}
export interface WeaponSkills {
    WeaponReloadAction: number;
    WeaponShotAction: number;
    WeaponFixAction: number;
    WeaponChamberAction: number;
}
export interface CovertMovement {
    MovementAction: number;
}
export interface Search {
    SearchAction: number;
    FindAction: number;
}
export interface WeaponTreatment {
    DurLossReducePerLevel: number;
    SkillPointsPerRepair: number;
    Filter: any[];
    WearAmountRepairGunsReducePerLevel: number;
    WearChanceRepairGunsReduceEliteLevel: number;
}
export interface MagDrills {
    RaidLoadedAmmoAction: number;
    RaidUnloadedAmmoAction: number;
    MagazineCheckAction: number;
}
export interface Perception {
    OnlineAction: number;
    UniqueLoot: number;
}
export interface Intellect {
    ExamineAction: number;
    SkillProgress: number;
    RepairAction: number;
    WearAmountReducePerLevel: number;
    WearChanceReduceEliteLevel: number;
    RepairPointsCostReduction: number;
}
export interface Attention {
    ExamineWithInstruction: number;
    FindActionFalse: number;
    FindActionTrue: number;
}
export interface Charisma {
    SkillProgressInt: number;
    SkillProgressAtn: number;
    SkillProgressPer: number;
}
export interface Memory {
    AnySkillUp: number;
    SkillProgress: number;
}
export interface Surgery {
    SurgeryAction: number;
    SkillProgress: number;
}
export interface AimDrills {
    WeaponShotAction: number;
}
export interface TroubleShooting {
    MalfRepairSpeedBonusPerLevel: number;
    SkillPointsPerMalfFix: number;
    EliteDurabilityChanceReduceMult: number;
    EliteAmmoChanceReduceMult: number;
    EliteMagChanceReduceMult: number;
}
export interface Aiming {
    ProceduralIntensityByPose: xyz;
    AimProceduralIntensity: number;
    HeavyWeight: number;
    LightWeight: number;
    MaxTimeHeavy: number;
    MinTimeHeavy: number;
    MaxTimeLight: number;
    MinTimeLight: number;
    RecoilScaling: number;
    RecoilDamping: number;
    CameraSnapGlobalMult: number;
    RecoilXIntensityByPose: xyz;
    RecoilYIntensityByPose: xyz;
    RecoilZIntensityByPose: xyz;
    RecoilCrank: boolean;
    RecoilHandDamping: number;
    RecoilConvergenceMult: number;
    RecoilVertBonus: number;
    RecoilBackBonus: number;
}
export interface Malfunction {
    AmmoMalfChanceMult: number;
    MagazineMalfChanceMult: number;
    MalfRepairHardSlideMult: number;
    MalfRepairOneHandBrokenMult: number;
    MalfRepairTwoHandsBrokenMult: number;
    AllowMalfForBots: boolean;
    ShowGlowAttemptsCount: number;
    OutToIdleSpeedMultForPistol: number;
    IdleToOutSpeedMultOnMalf: number;
    TimeToQuickdrawPistol: number;
    DurRangeToIgnoreMalfs: xyz;
    DurFeedWt: number;
    DurMisfireWt: number;
    DurJamWt: number;
    DurSoftSlideWt: number;
    DurHardSlideMinWt: number;
    DurHardSlideMaxWt: number;
    AmmoMisfireWt: number;
    AmmoFeedWt: number;
    AmmoJamWt: number;
    OverheatFeedWt: number;
    OverheatJamWt: number;
    OverheatSoftSlideWt: number;
    OverheatHardSlideMinWt: number;
    OverheatHardSlideMaxWt: number;
}
export interface Overheat {
    MinOverheat: number;
    MaxOverheat: number;
    OverheatProblemsStart: number;
    ModHeatFactor: number;
    ModCoolFactor: number;
    MinWearOnOverheat: number;
    MaxWearOnOverheat: number;
    MinWearOnMaxOverheat: number;
    MaxWearOnMaxOverheat: number;
    OverheatWearLimit: number;
    MaxCOIIncreaseMult: number;
    MinMalfChance: number;
    MaxMalfChance: number;
    DurReduceMinMult: number;
    DurReduceMaxMult: number;
    BarrelMoveRndDuration: number;
    BarrelMoveMaxMult: number;
    FireratePitchMult: number;
    FirerateReduceMinMult: number;
    FirerateReduceMaxMult: number;
    FirerateOverheatBorder: number;
    EnableSlideOnMaxOverheat: boolean;
    StartSlideOverheat: number;
    FixSlideOverheat: number;
    AutoshotMinOverheat: number;
    AutoshotChance: number;
    AutoshotPossibilityDuration: number;
    MaxOverheatCoolCoef: number;
}
export interface FenceSettings {
    FenceId: string;
    Levels: Record<string, FenceLevel>;
    paidExitStandingNumerator: number;
}
export interface FenceLevel {
    SavageCooldownModifier: number;
    ScavCaseTimeModifier: number;
    PaidExitCostModifier: number;
    BotFollowChance: number;
    ScavEquipmentSpawnChanceModifier: number;
    PriceModifier: number;
    HostileBosses: boolean;
    HostileScavs: boolean;
    ScavAttackSupport: boolean;
    ExfiltrationPriceModifier: number;
    AvailableExits: number;
}
export interface Inertia {
    InertiaLimits: xyz;
    InertiaLimitsStep: number;
    ExitMovementStateSpeedThreshold: xyz;
    WalkInertia: xyz;
    FallThreshold: number;
    SpeedLimitAfterFallMin: xyz;
    SpeedLimitAfterFallMax: xyz;
    SpeedLimitDurationMin: xyz;
    SpeedLimitDurationMax: xyz;
    SpeedInertiaAfterJump: xyz;
    BaseJumpPenaltyDuration: number;
    DurationPower: number;
    BaseJumpPenalty: number;
    PenaltyPower: number;
    InertiaTiltCurveMin: xyz;
    InertiaTiltCurveMax: xyz;
    InertiaBackwardCoef: xyz;
    TiltInertiaMaxSpeed: xyz;
    TiltStartSideBackSpeed: xyz;
    TiltMaxSideBackSpeed: xyz;
    TiltAcceleration: xyz;
    AverageRotationFrameSpan: number;
    SprintSpeedInertiaCurveMin: xyz;
    SprintSpeedInertiaCurveMax: xyz;
    SprintBrakeInertia: xyz;
    SprintTransitionMotionPreservation: xyz;
    WeaponFlipSpeed: xyz;
    PreSprintAccelerationLimits: xyz;
    SprintAccelerationLimits: xyz;
    SideTime: xyz;
    DiagonalTime: xyz;
    MaxTimeWithoutInput: xyz;
    MinDirectionBlendTime: number;
    MoveTimeRange: xyz;
    ProneDirectionAccelerationRange: xyz;
    ProneSpeedAccelerationRange: xyz;
    MinMovementAccelerationRangeRight: xyz;
    MaxMovementAccelerationRangeRight: xyz;
}
export interface xyz {
    x: number;
    y: number;
    z: number;
}
export interface Ballistic {
    GlobalDamageDegradationCoefficient: number;
}
export interface RepairKitSettings {
    armorClassDivisor: number;
    durabilityPointCostArmor: number;
    durabilityPointCostGuns: number;
}
export interface BotPreset {
    UseThis: boolean;
    Role: string;
    BotDifficulty: string;
    VisibleAngle: number;
    VisibleDistance: number;
    ScatteringPerMeter: number;
    HearingSense: number;
    SCATTERING_DIST_MODIF: number;
    MAX_AIMING_UPGRADE_BY_TIME: number;
    FIRST_CONTACT_ADD_SEC: number;
    COEF_IF_MOVE: number;
}
export interface BotWeaponScattering {
    Name: string;
    PriorityScatter1meter: number;
    PriorityScatter10meter: number;
    PriorityScatter100meter: number;
}
export interface Preset {
    _id: string;
    _type: string;
    _changeWeaponName: boolean;
    _name: string;
    _parent: string;
    _items: Item[];
    /** Default presets have this property */
    _encyclopedia?: string;
}
