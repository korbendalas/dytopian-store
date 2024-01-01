import { AxiosRequestConfig } from 'axios';

export type AxiosConfig = AxiosRequestConfig | undefined;

export function generateUpdatedConfig(config: AxiosConfig, token: string): AxiosConfig {
    const headers = {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
    };

    return {
        ...config,
        headers,
    };
}
