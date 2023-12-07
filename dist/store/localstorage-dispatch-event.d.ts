import { type TStorageType } from '@iicoding/utils';
type TR = Record<string, any>;
declare global {
    interface Window {
        sessionStorage: Storage & typeof storage;
        localStorage: Storage & typeof storage;
    }
}
declare class LocalstorageDispatchEvent {
    private getItem?;
    private setItem?;
    private removeItem?;
    constructor();
    set(key: string, value: any, trigger?: boolean): void;
    setMore(storageObject: TR, trigger?: boolean): void;
    get(key: string): string;
    get2Json(key: string): any;
    remove(key: string, trigger?: boolean): void;
    removeMore(removeKeys: string[], trigger?: boolean): void;
    clear(trigger?: boolean): void;
    private static dispatchEvent;
}
declare const storage: LocalstorageDispatchEvent;
export declare const extendStorageMethod: (storageType?: TStorageType | 'all') => void;
export default extendStorageMethod;
