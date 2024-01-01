import baseAxiosInstance from '@/components/UI/atoms/axiosConfig'
import { generateUpdatedConfig, AxiosConfig } from '@/components/UI/atoms/UpdateConfigUtilis';
import { saveToken, getToken, removeToken } from '@/utilis/tokenUtilis'

export class CustomError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, response: any) {
        super(message);
        this.response = response;
    }
}

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
    const updatedConfig: AxiosConfig = generateUpdatedConfig(config, token);

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
    let token = getToken();
    const updatedConfig: AxiosConfig = generateUpdatedConfig(config, token);

    return baseAxiosInstance
        .post<T>(url, data, updatedConfig)
        .then((response) => {
            const responseToken = response.data?.response?.token;

            if (responseToken) {
                token = responseToken;
                // Save the token to localStorage
                saveToken(token);
            }
            return Promise.resolve(response.data?.result);
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