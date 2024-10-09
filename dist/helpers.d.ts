type WebFile = File;
type MaybeBunFile = any;
type MaybeDenoFile = any;
declare let environment: 'web' | 'node';
export type BstoreFile = typeof environment extends 'bun' ? MaybeBunFile : typeof environment extends 'deno' ? MaybeDenoFile : WebFile;
export declare function getBstoreHost(): string;
export declare function getBstoreRWKey(): string;
export {};
