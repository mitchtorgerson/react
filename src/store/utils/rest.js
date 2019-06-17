import axios from 'axios';

function getOptions(userOptions) {
    const restDefaults = {

    };
    const newOptions = {
        ...userOptions,
        headers: { ...userOptions.headers },
    };

    const axiosKeys = Object.keys(newOptions).filter(k => !(k in restDefaults));
    const axiosOptions = axiosKeys.reduce((obj, k) => {
        obj[k] = newOptions[k];
        return obj;
    }, {});
    return [axiosOptions, newOptions];
}

export function genericErrorHandler(error, options) {
    return Promise.reject({ restError: error });
}

export function request(options) {
    const [axiosOptions] = getOptions(options);

    let promise = axios.request(axiosOptions);
    return promise.catch(error => genericErrorHandler(error, {

    }));
}

export function post(url, body, options) {
    return request({
        ...options,
        method: 'POST',
        url: url,
        data: body,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            ...(options && options.headers),
        },
    });
}

export function put(url, body, options) {
    return request({
        ...options,
        method: 'PUT',
        url: url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            ...(options && options.headers),
        },
    });
}

export function get(url, options) {
    return request({
        ...options,
        method: 'GET',
        url: url,
    });
}

export function del(url, options) {
    return request({
        ...options,
        method: 'DELETE',
        url: url,
    });
}

export default {
    genericErrorHandler,
    delete: del,
    get,
    post,
    put,
    request,
};
