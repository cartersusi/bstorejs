import type { BstoreFile } from "./helpers";
export declare enum Method {
    GET = 0,
    PUT = 1,
    DELETE = 2,
    LIST = 3
}
export interface BstoreRequest {
    method: Method;
    path: string;
    access: 'public' | 'private';
    file?: BstoreFile;
}
export interface BstoreResponse {
    status: number;
    message: string;
    url?: string;
    file?: BstoreFile;
    files?: string[];
}
export declare function bstore({ method, path, access, file }: BstoreRequest): Promise<BstoreResponse>;
