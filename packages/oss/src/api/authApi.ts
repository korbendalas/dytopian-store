import axios from 'axios';
import { LoginInput } from '@/components/pages/login.page';
import { RegisterInput } from '@/components/pages/register.page';
import { GenericResponse, ILoginResponse, IUserResponse } from './types';

const BASE_URL = 'https://dystopian-oss-api.daliborpetric.com/api/v1/';

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUserFn = async (user: RegisterInput) => {
    const response = await fetch('https://dystopian-oss-api.daliborpetric.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
    });
    return await response.json();
};

export const loginUserFn = async (user: LoginInput) => {
    const response = await authApi.post<ILoginResponse>('auth/signin', user);
    return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
    const response = await authApi.get<GenericResponse>(
        `auth/verifyemail/${verificationCode}`
    );
    return response.data;
};

export const logoutUserFn = async () => {
    const response = await authApi.get<GenericResponse>('auth/logout');
    return response.data;
};

export const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>('users/me');
    return response.data;
};
