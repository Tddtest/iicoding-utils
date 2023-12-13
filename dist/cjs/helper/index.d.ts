export declare const sleep: (time: number) => Promise<unknown>;
export declare const phoneDesensitization: (phone: string) => string;
export declare const credentialDesensitization: (credential: string) => string;
export declare const IdCardGender: <P = any>(idCard: string, placeholder?: P) => P | "0" | "1";
export declare const toFormData: (target: Record<string, any>) => FormData;
export declare const getRandomColor: (color?: string) => string;
export declare const color2hexadecimal: (hex: string, onlyValue?: boolean) => string | (string | number)[];
export declare const hexadecimal2color: (hexStr: string | (string | number)[]) => string;
