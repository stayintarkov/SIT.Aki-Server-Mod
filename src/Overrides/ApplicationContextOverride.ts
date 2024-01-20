import { DependencyContainer } from "tsyringe";

import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { ContextVariable } from "@spt-aki/context/ContextVariable";
import { ContextVariableType } from "@spt-aki/context/ContextVariableType";
import { LinkedList } from "@spt-aki/utils/collections/lists/LinkedList";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export class ApplicationContextOverride
{
    container: DependencyContainer;

    logger: ILogger;
    
    private variables = new Map<ContextVariableType, LinkedList<ContextVariable>>();
    private clientTimestamps: Record<string, number> = {};

    private static holderMaxSize = 10;
    
    constructor
    (
        container: DependencyContainer
    )
    {
        this.container = container;
        this.logger = container.resolve<ILogger>("WinstonLogger");
    }

    public override(): void 
    {
        this.container.afterResolution("ApplicationContext", (_t, result: ApplicationContext) => 
        {
            result.getLatestValue = (type: ContextVariableType): ContextVariable => 
            {
                if (type === ContextVariableType.CLIENT_START_TIMESTAMP) 
                {
                    return new ContextVariable(this.clientTimestamps, ContextVariableType.CLIENT_START_TIMESTAMP);
                }

                if (this.variables.has(type))
                {
                    return this.variables.get(type)?.getTail()?.getValue();
                }
        
                return undefined;
            }
            
            result.getValues = (type: ContextVariableType): ContextVariable[] => 
            {
                if (this.variables.has(type))
                {
                    return this.variables.get(type).toList();
                }
        
                return undefined;
            }
            
            result.addValue = (type: ContextVariableType, value: any): void => 
            {
                let list: LinkedList<ContextVariable>;
                if (this.variables.has(type))
                {
                    list = this.variables.get(type);
                }
                else
                {
                    list = new LinkedList<ContextVariable>();
                }
        
                if (list.getSize() >= ApplicationContextOverride.holderMaxSize)
                {
                    list.removeFirst();
                }

                if (type === ContextVariableType.CLIENT_START_TIMESTAMP) 
                {
                    if (typeof value === "number") 
                    {
                        // ignore SPT usecase
                        this.logger.info("Ignored Old Timestamp Storage")
                        return;
                    }

                    this.logger.info("Storing Timestamp, entries: " + Object.keys(this.clientTimestamps).length.toString())
                    this.clientTimestamps[value.sessionId] = value.timestamp;
                    this.logger.info("Stored Timestamp, entries: " + Object.keys(this.clientTimestamps).length.toString())
                    return;
                }

                list.add(new ContextVariable(value, type));
                this.variables.set(type, list);
            }
            
            result.clearValues = (type: ContextVariableType): void => 
            {
                if (this.variables.has(type))
                {
                    this.variables.delete(type);
                }
            }
            
        }, {frequency: "Always"});
    }
}