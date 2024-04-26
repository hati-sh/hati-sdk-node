export declare enum StorageType {
    MEMORY = "memory",
    HDD = "hdd"
}
declare class HatiSdk {
    private options_;
    private client_;
    constructor(options?: {
        host: string;
        port: number;
    });
    setOptions(options: {
        host: string;
        port: number;
    }): void;
    prepareCommand(payload: string): string;
    publish(command: string): Promise<string>;
    set(key: string, value: string, storageType?: StorageType, ttl?: number): Promise<boolean>;
    get(key: string, storageType?: StorageType): Promise<string | null>;
    has(key: string, storageType?: StorageType): Promise<boolean>;
    delete(key: string, storageType?: StorageType): Promise<boolean>;
}
export { HatiSdk };
export default HatiSdk;
