import { bstore, Method } from "./bstore";
export async function del(path, access) {
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
