import { bstore, Method } from "./bstore";

export interface BstoreListResponse {
  status: number;
  message: string;
  files?: string[];
}

export async function list(path: string, access: 'public' | 'private'): Promise<BstoreListResponse> {
  const res = await bstore({ 
      method: Method.LIST, 
      path: path, 
      access: access
  });
  return {
    status: res.status,
    message: res.message,
    files: res.files
  };
}
