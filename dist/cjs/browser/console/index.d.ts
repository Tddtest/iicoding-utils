import { type TFn } from "..";
export interface IConsoleExtends {
    log: TFn;
    yellow: TFn;
    red: TFn;
    green: TFn;
    blue: TFn;
    cyan: TFn;
    gray: TFn;
}
declare global {
    export interface Window {
        console: IConsoleExtends;
    }
    export interface Console extends IConsoleExtends {
    }
}
export declare const consoleExtend: () => void;
