export interface IHideoutSingleProductionStartRequestData {
    Action: "HideoutSingleProductionStart";
    recipeId: string;
    items: Item[];
    timestamp: number;
}
export interface Item {
    id: string;
    count: number;
}
