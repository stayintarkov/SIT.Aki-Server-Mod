import { ContextVariable } from "./ContextVariable";
import { ContextVariableType } from "./ContextVariableType";
export declare class ApplicationContext {
    private variables;
    private static holderMaxSize;
    /**
     * Called like:
     *
     * const registerPlayerInfo = this.applicationContext.getLatestValue(ContextVariableType.REGISTER_PLAYER_REQUEST).getValue<IRegisterPlayerRequestData>();
     *
     * const matchInfo = this.applicationContext.getLatestValue(ContextVariableType.MATCH_INFO).getValue<IStartOfflineRaidRequestData>();
     * @param type
     * @returns
     */
    getLatestValue(type: ContextVariableType): ContextVariable;
    getValues(type: ContextVariableType): ContextVariable[];
    addValue(type: ContextVariableType, value: any): void;
}
