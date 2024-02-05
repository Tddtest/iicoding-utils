export declare const getCookie: (cookieKey?: string) => any;
export declare const setCookie: (key: string, value: string, expires?: number) => void;
export declare const deleteCookie: (key: string) => void;
export declare function getBrowserType(): "" | "Opera" | "IE" | "Safari" | "Firefox" | "Chrome";
export declare const isSafari: () => boolean;
export declare const isChrome: () => boolean;
export declare const isFirefox: () => boolean;
export declare const isOpera: () => boolean;
export declare const isIE: () => boolean;
