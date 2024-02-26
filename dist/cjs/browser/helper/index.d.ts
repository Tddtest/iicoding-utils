export * from './copy';
export * from './debounce';
export declare const sleep: (time: number) => Promise<unknown>;
export declare const phoneDesensitization: (phone: string) => string;
export declare const credentialDesensitization: (credential: string) => string;
export declare const IdCardGender: <P = any>(idCard: string, placeholder?: P) => "0" | P | "1";
export declare const toFormData: (target: Record<string, any>) => FormData;
