export declare namespace ModLoader {
    interface IMod {
        name: string;
        version: string;
        main?: string;
        author?: string;
        license: string;
        dependencies?: Record<string, string>;
    }
}
