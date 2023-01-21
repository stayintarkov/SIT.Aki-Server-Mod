import { INotifierChannel } from "./INotifier";
export interface ISelectProfileResponse {
    status: string;
    notifier: INotifierChannel;
    notifierServer: string;
}
