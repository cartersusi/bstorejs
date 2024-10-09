import { getBstoreHost, getBstoreRWKey } from "./helpers";
export var Method;
(function (Method) {
    Method[Method["GET"] = 0] = "GET";
    Method[Method["PUT"] = 1] = "PUT";
    Method[Method["DELETE"] = 2] = "DELETE";
    Method[Method["LIST"] = 3] = "LIST";
})(Method || (Method = {}));
const Methods = {
    [Method.GET]: {
        route: 'api/download/',
        method: 'GET'
    },
    [Method.PUT]: {
        route: 'api/upload/',
        method: 'PUT'
    },
    [Method.DELETE]: {
        route: 'api/delete/',
        method: 'DELETE'
    },
    [Method.LIST]: {
        route: 'api/list/',
        method: 'GET'
    }
};
export async function bstore({ method, path, access, file }) {
    const BStoreRWKey = getBstoreRWKey();
    const BstoreHost = getBstoreHost();
    var ret = {
        status: 0,
        message: 'Failed to fetch'
    };
    var extra_headers = {
        'Content-Type': (file === null || file === void 0 ? void 0 : file.type) || '',
    };
    var api_url = `${Methods[method].route}/${path}`;
    api_url = api_url.replace(/\/\//g, '/');
    api_url = `${BstoreHost}/${api_url}`;
    if (!check_url(api_url)) {
        return handle_error(path, ret);
    }
    let res;
    try {
        res = await fetch(api_url, {
            method: Methods[method].method,
            headers: {
                'X-access': access,
                'Authorization': `Bearer ${BStoreRWKey}`,
                ...extra_headers,
            },
            body: file,
        });
    }
    catch (error) {
        ret = handle_error(path, ret);
        ret.status = 500;
        ret.message = error;
        return ret;
    }
    if (res.status !== 200) {
        ret.status = res.status;
        ret.message = res.statusText;
        return ret;
    }
    ret.status = res.status;
    ret.message = `Successful: ${Methods[method].method} ${path}`;
    if (method === Method.GET) {
        try {
            await res.blob().then((blob) => {
                ret.file = new File([blob], path.split('/').pop() || 'file', { type: blob.type });
            });
        }
        catch (error) {
            ret.status = 500;
            ret.message = error;
        }
    }
    if (method === Method.PUT) {
        try {
            await res.json().then((data) => {
                ret.url = data.url;
            });
        }
        catch (error) {
            ret.status = 500;
            ret.message = error;
        }
    }
    if (method === Method.LIST) {
        try {
            await res.json().then((data) => {
                ret.files = data.files;
            });
        }
        catch (error) {
            ret.status = 500;
            ret.message = error;
        }
    }
    return ret;
}
function check_url(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}
function check_path(path) {
    if (path.includes('/public/') || path.includes('/private/') || path.includes('/pub/') || path.includes('/priv/')) {
        return 'Public and Private access should be specified in the access parameter, not the URL.';
    }
    return '';
}
function check_host() {
    const BstoreHost = getBstoreHost();
    if (getBstoreHost() === '' || getBstoreHost() === undefined) {
        return 'BStore Host not set';
    }
    if (!check_url(BstoreHost)) {
        return 'Invalid BStore Host';
    }
    return '';
}
function handle_error(path, ret) {
    const host_error = check_host();
    if (host_error !== '') {
        ret.status = 400;
        ret.message = host_error;
        return ret;
    }
    const path_error = check_path(path);
    if (path_error !== '') {
        ret.status = 400;
        ret.message = path_error;
        return ret;
    }
    ret.status = 400;
    ret.message = 'Invalid URL';
    return ret;
}
