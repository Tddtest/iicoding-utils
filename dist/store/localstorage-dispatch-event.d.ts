import type { TStorageType, ExtendStoreGet, ExtendStoreSet, ExtendStoreSetMore, ExtendStoreGet2Json, ExtendStoreRemove, ExtendStoreClearAll, ExtendStoreRemoveMore } from '@iicoding/utils';
interface IExtendMethod {
    get: ExtendStoreGet;
    get2Json: ExtendStoreGet2Json;
    set: ExtendStoreSet;
    setMore: ExtendStoreSetMore;
    remove: ExtendStoreRemove;
    removeMore: ExtendStoreRemoveMore;
    clearAll: ExtendStoreClearAll;
}
declare global {
    export interface Window {
        sessionStorage: Storage & IExtendMethod;
        localStorage: Storage & IExtendMethod;
    }
}
export declare const extendStorageMethod: (storageType?: TStorageType | 'all') => void;
export default extendStorageMethod;
