import { bstore, Method } from "./bstore";

export interface BstoreDelResponse {
  status: number;
  message: string;
}

export async function del(path: string, access: 'public' | 'private'): Promise<BstoreDelResponse> {
  const res = await bstore({ 
      method: Method.DELETE, 
      path: path, 
      access: access
  });
  return {
    status: res.status,
    message: res.message
  };
}