import { TFn } from '..';
export declare function debounce(func: TFn, wait: number, options: Record<string, any>): {
    (...args: any[]): void;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export default debounce;
