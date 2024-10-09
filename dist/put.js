import { bstore, Method } from "./bstore";
export async function put(path, access, file) {
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
