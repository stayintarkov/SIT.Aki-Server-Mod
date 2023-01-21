export interface IJoinMatchRequestData {
    location: string;
    savage: boolean;
    dt: string;
    servers: Server[];
    keyId: string;
}
export interface Server {
    ping: number;
    ip: string;
    port: string;
}
