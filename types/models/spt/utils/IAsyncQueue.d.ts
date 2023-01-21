import { ICommand } from "./ICommand";
export interface IAsyncQueue {
    waitFor(command: ICommand): Promise<any>;
}
