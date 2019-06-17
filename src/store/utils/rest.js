import axios from 'axios';

function getOptions(userOptions) {
    const restDefaults = {
        okStatuses: [],
        noCache: true,
    };
    const axiosDefaults = {
        timeout: userOptions.slow ? 120000 : 30000,
        maxContentLength: 1000000,
        responseType: 'json',
        transformRequest: [transformUrlEncoded].concat(axios.defaults.transformRequest),
    };
    const newOptions = {
        ...restDefaults,
        ...axiosDefaults,
        ...userOptions,
        headers: { ...userOptions.headers },
    };

    if (newOptions.okStatuses.length) {
        const okStatuses = newOptions.okStatuses;
        const oldValidateStatus = newOptions.validateStatus || axios.defaults.validateStatus;
        newOptions.validateStatus = status => (okStatuses.indexOf(status) >= 0 || oldValidateStatus(status));
    }

    if (newOptions.noCache) {
        newOptions.headers['Cache-Control'] = 'no-cache';
        newOptions.headers.Pragma = 'no-cache';
    }

    const axiosKeys = Object.keys(newOptions).filter(k => !(k in restDefaults));
    const axiosOptions = axiosKeys.reduce((obj, k) => {
        obj[k] = newOptions[k];
        return obj;
    }, {});
    return [axiosOptions, newOptions];
}

function transformUrlEncoded(data, headers) {
    if (!(typeof data === 'object' &&
        headers['Content-Type'] && headers['Content-Type'].toLowerCase() === 'application/x-www-form-urlencoded')
    ) {
        return data;
    }
    return Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
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
