export declare function setupTest(testName: string, callback: (options: TestOptions) => void): void;
export declare class TestOptions {
    testCount: number;
    readonly tests: [string, () => Promise<boolean>][];
    private isRunning;
    private runBeforeCallback;
    private runAfterCallback;
    runBefore(callback: (() => void) | null): void;
    runAfter(callback: (() => void) | null): void;
    run(desc: string, callback: () => Promise<boolean>): void;
    startTests(): Promise<void>;
    get isTestRunning(): boolean;
}
import "./ssdp.flux-test";
import "./api.flux-test";
