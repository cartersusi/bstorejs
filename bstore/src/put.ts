import type { BstoreFile } from "./helpers";

import { bstore, Method } from "./bstore";

export interface BstorePutResponse {
    status: number;
    message: string;
    url: string;
}

export async function put(path: string, access: 'public' | 'private', file: BstoreFile): Promise<BstorePutResponse> {
    if (!file) {
        return {
            status: 400,
            message: 'No file provided',
            url: ''

        };
    }

    const res = await bstore({ method: Method.PUT, 
        path: path, 
        access: access, 
        file: file 
    });

    return {
        status: res.status,
        message: res.message,
        url: res.url || ''
    };
}