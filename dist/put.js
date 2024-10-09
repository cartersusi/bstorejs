import { bstore, Method } from "./bstore";
export async function put(file, path, access) {
    if (!file) {
        return {
            status: 400,
            message: 'No file provided',
            url: ''
        };
    }
    const res = await bstore({ method: Method.PUT,
        file: file,
        path: path,
        access: access,
    });
    return {
        status: res.status,
        message: res.message,
        url: res.url || ''
    };
}
