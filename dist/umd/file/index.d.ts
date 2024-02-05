export interface Ctx extends HTMLCanvasElement {
    ctx: CanvasRenderingContext2D;
}
export interface Canvas2FileOptions {
    quality?: number;
    width?: number;
    height?: number;
    scale?: number;
    compressionSize?: number;
}
export interface ChangeOptions extends Required<Omit<Canvas2FileOptions, 'quality' | 'compressionSize'>> {
    changeWidth?: number;
    changeHeight?: number;
}
export declare const getBase64File: (file: File) => Promise<string>;
export declare const getImgFile: (file: string) => Promise<HTMLImageElement>;
export declare const generateCanvas2D: (width: number, height: number) => Ctx;
export declare const downloadAtLinkByHref: (href: string, filename: string) => void;
export declare const downloadFile: (filename: string, file: File | Blob, fileType?: string) => void;
export declare const getImgCanvasCtx: (base64File: string, options?: Partial<ChangeOptions>) => Promise<Ctx>;
export declare const canvas2file: (canvasCtx: Ctx, type?: File['type'], quality?: number) => Promise<Blob | null>;
export declare const compressionFile: (file: File, type?: File['type'], options?: Canvas2FileOptions) => Promise<Blob | null>;
export declare const blob2file: (blob: unknown, filename: string) => File | null;
export declare const base642file: (base: any, filename: any) => File;
