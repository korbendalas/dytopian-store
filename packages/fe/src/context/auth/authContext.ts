import { AuthContextValue } from '@/api/auth/types';
import React from 'react';

export const AuthContext = React.createContext<AuthContextValue | null>(null);
