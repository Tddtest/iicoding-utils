import { TFn } from "@iicoding/utils";
export interface IConsoleExtends {
    colorful: TFn;
    yellow: TFn;
    yellowBg: TFn;
    red: TFn;
    redBg: TFn;
    green: TFn;
    greenBg: TFn;
    blue: TFn;
    blueBg: TFn;
}
declare global {
    export interface Window {
        console: IConsoleExtends;
    }
    export interface Console extends IConsoleExtends {
    }
}
export declare const consoleExtend: () => void;
