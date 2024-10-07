import type { BstoreFile } from "./helpers";

import { bstore, Method } from "./bstore";

export interface BstoreListResponse{
  status: number;
  message: string;
  file: BstoreFile;
}

export async function get(path: string, access: 'public' | 'private'): Promise<BstoreListResponse> {
  const res = await bstore({ 
      method: Method.GET, 
      path: path, 
      access: access 
  });
  return {
    status: res.status,
    message: res.message,
    file: res.file
  };
}