import type { BstoreFile } from "./helpers";
export interface BstorePutResponse {
    status: number;
    message: string;
    url: string;
}
export declare function put(path: string, access: 'public' | 'private', file: BstoreFile): Promise<BstorePutResponse>;
