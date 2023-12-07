import { type TStorageType } from '@iicoding/utils';
type TR = Record<string, any>;
type TStorageExtent = typeof storage;
interface IExtendMethod {
    get: TStorageExtent['get'];
    get2Json: TStorageExtent['get2Json'];
    set: TStorageExtent['set'];
    setMore: TStorageExtent['setMore'];
    remove: TStorageExtent['remove'];
    removeMore: TStorageExtent['removeMore'];
    clearAll: TStorageExtent['clearAll'];
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
    get(key: string): string;
    get2Json(key: string): any;
    remove(key: string, trigger?: boolean): void;
    removeMore(removeKeys: string[], trigger?: boolean): void;
    clearAll(trigger?: boolean): void;
    private static dispatchEvent;
}
declare const storage: LocalstorageDispatchEvent;
export declare const extendStorageMethod: (storageType?: TStorageType | 'all') => void;
export default extendStorageMethod;
