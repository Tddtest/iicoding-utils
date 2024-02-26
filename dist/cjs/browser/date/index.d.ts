export type TRemainder = {
    errMsg: string | null;
    targetTime: number | null;
    isExpiration: boolean | null;
    timeToExpiration: string | null;
};
export declare const getRemainder: (target: number | string | Date) => TRemainder;
