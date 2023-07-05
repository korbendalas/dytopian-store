import { UserResponse } from '@/api/auth/types';
import { axios } from '@/lib/axios';

// import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios.post('/auth/signin', data);
};

export const logoutUser = (): Promise<UserResponse> => {
  return axios.post('/auth/logout');
};
