import { bstore, Method } from "./bstore";
export async function get(path, access) {
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
