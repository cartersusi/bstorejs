import type { BstoreFile } from "./helpers";
export interface BstorePutResponse {
    status: number;
    message: string;
    url: string;
}
export declare function put(file: BstoreFile, path: string, access: 'public' | 'private'): Promise<BstorePutResponse>;
