import { EquipmentBuildType } from "../../../models/enums/EquipmentBuildType";
import { MemberCategory } from "../../../models/enums/MemberCategory";
import { MessageType } from "../../enums/MessageType";
import { IPmcData } from "../common/IPmcData";
import { Item } from "../common/tables/IItem";
export interface IAkiProfile {
    info: Info;
    characters: Characters;
    /** Clothing purchases */
    suits: string[];
    userbuilds: IUserBuilds;
    dialogues: Record<string, Dialogue>;
    aki: Aki;
    vitality: Vitality;
    inraid: Inraid;
    insurance: Insurance[];
    /** Assort purchases made by player since last trader refresh */
    traderPurchases?: Record<string, Record<string, TraderPurchaseData>>;
}
export declare class TraderPurchaseData {
    count: number;
    purchaseTimestamp: number;
}
export interface Info {
    id: string;
    aid: number;
    username: string;
    password: string;
    wipe: boolean;
    edition: string;
}
export interface Characters {
    pmc: IPmcData;
    scav: IPmcData;
}
export interface IUserBuilds {
    weaponBuilds: IWeaponBuild[];
    equipmentBuilds: IEquipmentBuild[];
}
export interface IWeaponBuild {
    id: string;
    name: string;
    root: string;
    items: Item[];
    type: string;
}
export interface IEquipmentBuild {
    id: string;
    name: string;
    root: string;
    items: Item[];
    type: string;
    fastPanel: Record<string, string>;
    buildType: EquipmentBuildType;
}
export interface Dialogue {
    attachmentsNew: number;
    type: MessageType;
    new: number;
    _id: string;
    Users?: IUserDialogInfo[];
    pinned: boolean;
    messages: Message[];
}
export interface IUserDialogInfo {
    _id: string;
    info: IUserDialogDetails;
}
export interface IUserDialogDetails {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
}
export interface DialogueInfo {
    attachmentsNew: number;
    new: number;
    _id: string;
    type: MessageType;
    pinned: boolean;
    Users?: IUserDialogInfo[];
    message: MessagePreview;
}
export interface Message {
    _id: string;
    uid: string;
    type: MessageType;
    dt: number;
    UtcDateTime?: number;
    Member?: IUpdatableChatMember;
    templateId?: string;
    text?: string;
    hasRewards?: boolean;
    rewardCollected: boolean;
    items?: MessageItems;
    maxStorageTime?: number;
    systemData?: ISystemData;
    profileChangeEvents?: any[];
}
export interface MessagePreview {
    uid: string;
    type: MessageType;
    dt: number;
    templateId: string;
    text?: string;
    systemData?: ISystemData;
}
export interface MessageItems {
    stash?: string;
    data?: Item[];
}
export interface ISystemData {
    date?: string;
    time?: string;
    location?: string;
    buyerNickname?: string;
    soldItem?: string;
    itemCount?: number;
}
export interface IUpdatableChatMember {
    Nickname: string;
    Side: string;
    Level: number;
    MemberCategory: MemberCategory;
    Ignored: boolean;
    Banned: boolean;
}
export interface DateTime {
    date: string;
    time: string;
}
export interface Aki {
    version: string;
    mods?: ModDetails[];
    receivedGifts: ReceivedGift[];
}
export interface ModDetails {
    name: string;
    version: string;
    author: string;
    dateAdded: number;
}
export interface ReceivedGift {
    giftId: string;
    timestampAccepted: number;
}
export interface Vitality {
    health: Health;
    effects: Effects;
}
export interface Health {
    Hydration: number;
    Energy: number;
    Temperature: number;
    Head: number;
    Chest: number;
    Stomach: number;
    LeftArm: number;
    RightArm: number;
    LeftLeg: number;
    RightLeg: number;
}
export interface Effects {
    Head: Head;
    Chest: Chest;
    Stomach: Stomach;
    LeftArm: LeftArm;
    RightArm: RightArm;
    LeftLeg: LeftLeg;
    RightLeg: RightLeg;
}
export interface Head {
}
export interface Chest {
}
export interface Stomach {
}
export interface LeftArm {
    Fracture?: number;
}
export interface RightArm {
    Fracture?: number;
}
export interface LeftLeg {
    Fracture?: number;
}
export interface RightLeg {
    Fracture?: number;
}
export interface Inraid {
    location: string;
    character: string;
}
export interface Insurance {
    scheduledTime: number;
    traderId: string;
    messageContent: MessageContent;
    items: Item[];
}
export interface MessageContent {
    ragfair?: MessageContentRagfair;
    text?: string;
    templateId: string;
    type: MessageType;
    maxStorageTime?: number;
    profileChangeEvents?: any[];
    systemData?: ISystemData;
}
export interface MessageContentRagfair {
    offerId: string;
    count: number;
    handbookId: string;
}
