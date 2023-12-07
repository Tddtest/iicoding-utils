import type { TStorageType } from "./type";
type TR = Record<string, any>;
declare class LocalstorageDispatchEvent {
    private readonly storage;
    constructor(type: TStorageType);
    set(key: string, value: any, trigger?: boolean): void;
    setMore(storageObject: TR, trigger?: boolean): void;
    get(key: string): string;
    get2Json(key: string): any;
    remove(key: string, trigger?: boolean): void;
    removeMore(removeKeys: string[], trigger?: boolean): void;
    clear(trigger?: boolean): void;
    private static dispatchEvent;
}
export declare const _localStorage: LocalstorageDispatchEvent;
export declare const _sessionStorage: LocalstorageDispatchEvent;
export default LocalstorageDispatchEvent;
