import { type TStorageType } from '@iicoding/utils';
type TR = Record<string, any>;
interface IExtendMethod {
    get: LocalstorageDispatchEvent['get'];
    get2Json: LocalstorageDispatchEvent['get2Json'];
    set: LocalstorageDispatchEvent['set'];
    setMore: LocalstorageDispatchEvent['setMore'];
    remove: LocalstorageDispatchEvent['remove'];
    removeMore: LocalstorageDispatchEvent['removeMore'];
    clearAll: LocalstorageDispatchEvent['clearAll'];
}
declare global {
    export interface Window {
        sessionStorage: Storage & IExtendMethod;
        localStorage: Storage & IExtendMethod;
    }
}
declare class LocalstorageDispatchEvent {
    private getItem?;
    private setItem?;
    private removeItem?;
    private clear?;
    constructor();
    set(key: string, value: any, trigger?: boolean): void;
    setMore(storageObject: TR, trigger?: boolean): void;
    get(key: string): string | null;
    get2Json(key: string): string | null;
    remove(key: string, trigger?: boolean): void;
    removeMore(removeKeys: string[], trigger?: boolean): void;
    clearAll(trigger?: boolean): void;
    private static dispatchEvent;
}
export declare const extendStorageMethod: (storageType?: TStorageType | 'all') => void;
export default extendStorageMethod;
