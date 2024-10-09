import { bstore, Method } from "./bstore";
export async function list(path, access) {
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
