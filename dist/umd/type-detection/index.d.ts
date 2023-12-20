export type ComplexResult = 'object' | 'function' | 'error' | 'date' | 'regExp' | 'array' | 'blob' | 'promise';
export declare const getComplex: (source: unknown) => ComplexResult | undefined;
export declare const getType: (source: unknown) => string;
export declare const isNumber: (num: unknown) => num is number;
export declare const isString: (str: unknown) => str is string;
export declare const isSymbol: (sym: unknown) => sym is symbol;
export declare const isBigInteger: (num: unknown) => num is bigint;
export declare const isBoolean: (bool: unknown) => bool is boolean;
export declare const isObject: (obj: unknown) => obj is object;
export declare const isBlob: (blob: unknown) => blob is Blob;
export declare const isDate: (date: unknown) => date is Date;
export declare const isHTMLElement: (element: unknown) => element is HTMLElement;
export declare const isPlainObject: (obj: unknown) => obj is object;
export declare const isFunction: (func: unknown) => boolean;
export declare const isPromise: (source: unknown) => boolean;
