import { type TFn } from "..";
export interface IConsoleExtends {
    log: TFn;
    color: (color: ColorValue, type?: ColorType) => Console;
    textColor: (color: CSSStyleDeclaration['color'], once?: boolean) => Console;
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
type ColorType = 'text' | 'bg' | 'textGradient' | 'bgGradient';
type ColorValue = CSSStyleDeclaration['color'] | CSSStyleDeclaration['color'][];
declare class Console {
    private console;
    private colorValue?;
    private colorType?;
    private textColorValue;
    private textColorOnce;
    private style;
    private baseStyle;
    private baseRadiusStyle;
    private textGradientStyle;
    constructor();
    color: (color: ColorValue, type?: ColorType) => this;
    textColor: (color: CSSStyleDeclaration['color'], once?: boolean) => this;
    log: (...args: any[]) => this;
    red: (...args: any[]) => this;
    blue: (...args: any[]) => this;
    green: (...args: any[]) => this;
    yellow: (...args: any[]) => this;
    cyan: (...args: any[]) => this;
    gray: (...args: any[]) => this;
    private logForColor;
    private executeLog;
    private setTextStyle;
    private setBgStyle;
    private renderTextGradient;
    private renderBgGradient;
    private wrapperConsole;
    private logColor;
    private renderLog;
    private setColorValue;
    private clearColorValue;
    private generateGradient;
}
export declare const icdInstance: Console;
export declare const consoleExtend: () => void;
export {};
