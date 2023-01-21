import { IStaticContainerProps, IStaticLootDetails, IStaticAmmoDetails, IStaticForcedProps } from "../../eft/common/tables/ILootBase";
import { ILooseLoot, SpawnpointTemplate } from "../../eft/common/ILooseLoot";
export interface ILocationGenerator {
    generateContainerLoot(containerIn: IStaticContainerProps, staticForced: IStaticForcedProps[], staticLootDist: Record<string, IStaticLootDetails>, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): IStaticContainerProps;
    generateDynamicLoot(dynamicLootDist: ILooseLoot, staticAmmoDist: Record<string, IStaticAmmoDetails[]>, locationName: string): SpawnpointTemplate[];
}
