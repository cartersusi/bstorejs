interface BunFile extends Blob {
    slice(begin?: number, end?: number, contentType?: string): BunFile;
    slice(begin?: number, contentType?: string): BunFile;
    slice(contentType?: string): BunFile;
    writer(options?: {
        highWaterMark?: number;
    }): FileSink;
    readonly readable: ReadableStream;
    lastModified: number;
    readonly name?: string;
    exists(): Promise<boolean>;
}
interface FileSink {
    write(chunk: string | ArrayBufferView | ArrayBuffer | SharedArrayBuffer): number;
    flush(): number | Promise<number>;
    end(error?: Error): number | Promise<number>;
    start(options?: {
        highWaterMark?: number;
    }): void;
    ref(): void;
    unref(): void;
}
export type BstoreFile = File | BunFile | Blob;
export declare function getBstoreHost(): string;
export declare function getBstoreRWKey(): string;
export {};
