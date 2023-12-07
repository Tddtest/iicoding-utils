import { ExtendStoreGet, ExtendStoreSet, ExtendStoreSetMore, ExtendStoreGet2Json, ExtendStoreRemove, ExtendStoreClearAll, ExtendStoreRemoveMore } from "@iicoding/utils";
declare abstract class BaseStore {
    set: ExtendStoreSet;
    get: ExtendStoreGet;
    remove: ExtendStoreRemove;
    setMore: ExtendStoreSetMore;
    get2Json: ExtendStoreGet2Json;
    clearAll: ExtendStoreClearAll;
    removeMore: ExtendStoreRemoveMore;
}
export default BaseStore;
