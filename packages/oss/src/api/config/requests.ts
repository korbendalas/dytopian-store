import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { saveToken, getToken, removeToken } from '@/utilis/tokenUtilis'

type AxiosConfig = AxiosRequestConfig | undefined;

function filterInvalidParams(params: Record<string, any>): Record<string, any> {
    // Filter out undefined or null values from the params object
    const filteredParams: Record<string, any> = {};
    for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
            filteredParams[key] = params[key];
        }
    }
    return filteredParams;
}

export class CustomError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, response: any) {
        super(message);
        this.response = response;
    }
}
const baseAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://dystopian-oss-api.daliborpetric.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error: any) => {
    // Handle errors as needed
    console.error('Axios request error:', error);
    throw error;
};

export function get<T>(
    url: string,
    config: AxiosConfig = undefined,
    enableDefaultErrorHandling = true,
    isGraph = false
    ): Promise<T> {
    // Get the token from localStorage
    const token = getToken();

    // Include the token in the request headers
    const headers = {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
    };
    const updatedConfig: AxiosConfig = {
        ...config,
        headers,
    };

    return baseAxiosInstance
        .get<T>(url, updatedConfig)
        .then((response) => Promise.resolve(isGraph ? response.data : response.data.result))
        .catch((error) => handleError(error, enableDefaultErrorHandling, isGraph));
}

export function post<T, R>(
    url: string,
    data: T,
    enableDefaultErrorHandling = true,
    config: AxiosConfig = undefined
):  Promise<R> {
    const token = getToken();

    // Include the token in the request headers
    const headers = {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
    };
    const updatedConfig: AxiosConfig = {
        ...config,
        headers,
    };

    return baseAxiosInstance
        .post<T>(url, data, updatedConfig)
        .then((response) => {
            Promise.resolve(response.data.result);
            const token = response.data.token;
            // Save the token to localStorage
            saveToken(token);
        })
        .catch((error) => handleError(error, enableDefaultErrorHandling));
}

export function put<T, R>(
    url: string,
    data?: T,
    enableDefaultErrorHandling = true,
    config: AxiosConfig = undefined
):  Promise<R> {
    return baseAxiosInstance
        .put<T>(url, data, config)
        .then((response) => Promise.resolve(response.data.result))
        .catch((error) => handleError(error, enableDefaultErrorHandling));
}

export function patch<T, R>(
    url: string,
    data: T,
    enableDefaultErrorHandling = true,
    config: AxiosConfig = undefined
):  Promise<R> {
    return baseAxiosInstance
        .patch(url, data, config)
        .then((response) => Promise.resolve(response.data.result))
        .catch((error) => handleError(error, enableDefaultErrorHandling));
}

export function remove<T>(
    url: string,
    enableDefaultErrorHandling = true,
    config: AxiosConfig = undefined
):  Promise<T> {
    return baseAxiosInstance
        .delete(url, config)
        .then((response) => Promise.resolve(response.data.result))
        .catch((error) => handleError(error, enableDefaultErrorHandling));
}