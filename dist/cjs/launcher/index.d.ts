/// <reference types="node" />
import child_process from 'child_process';
import type { TFn } from '../../browserasf';
export declare const runAsync: (command: string) => Promise<{
    stdout: string;
    stderr: string;
}>;
export declare const runSync: (command: string) => string;
export declare const runShellExec: (command: string, cb?: TFn) => child_process.ChildProcess;
