import type { Color, Options } from 'ora';
interface LoggerOptions extends Options {
    chalkColor?: Color;
}
declare class Logger {
    private ora?;
    private options?;
    start: (options?: LoggerOptions) => void;
    succeed(options: LoggerOptions | string): void;
    fail: (options: LoggerOptions | string) => void;
    stop: () => void;
}
export declare const logger: Logger;
export default Logger;
