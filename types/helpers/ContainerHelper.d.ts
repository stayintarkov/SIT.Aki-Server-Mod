export declare class FindSlotResult {
    success: boolean;
    x: any;
    y: any;
    rotation: boolean;
    constructor(success?: boolean, x?: any, y?: any, rotation?: boolean);
}
export declare class ContainerHelper {
    protected locateSlot(container2D: number[][], containerX: number, containerY: number, x: number, y: number, itemW: number, itemH: number): boolean;
    findSlotForItem(container2D: number[][], itemWidth: number, itemHeight: number): FindSlotResult;
    fillContainerMapWithItem(container2D: number[][], x: number, y: number, itemW: number, itemH: number, rotate: boolean): any;
}
