import { AuthUser } from '@/api/auth/types';
import { axios } from '@/lib/axios';
export const getUser = (): Promise<AuthUser> => {
  return axios.get('users/me');
};
