export declare const getRandomColor: (color?: string) => string;
export declare function color2rgb(hex: string, opacity?: number): string;
export declare const hexadecimal2color: (hexStr: string | (string | number)[]) => string;
export declare const rgb2hsl: (rgb: number[]) => Record<string, any>;
export declare const changeRgba: (rgbaColor: string, newOpacity: number) => string;
