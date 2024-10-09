import type { BstoreFile } from "./helpers";
export interface BstoreListResponse {
    status: number;
    message: string;
    file?: BstoreFile;
}
export declare function get(path: string, access: 'public' | 'private'): Promise<BstoreListResponse>;
