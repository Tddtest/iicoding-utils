export declare const createFileOrDirectory: (path: string) => Promise<void>;
export declare const updateFile: (filePath: string, content: string) => Promise<void>;
export declare const updateFileSync: (filePath: string, content: string) => void;
export declare const getFile: (filePath: string) => Promise<string>;
export declare const getFileSync: (filePath: string) => string;
