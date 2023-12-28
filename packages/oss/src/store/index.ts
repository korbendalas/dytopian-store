import {create} from 'zustand';
import { IUser } from '@/api/types';

type sidebarStoreProps = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;

}

type AuthStoreProps = {
    authUser: IUser | null;
    requestLoading: boolean;
    setAuthUser: (user: IUser | null) => void;
    setRequestLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
    authUser: null,
    requestLoading: false,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),
}));

export  const useSidebarStore = create<sidebarStoreProps>((set) => {
    return {
        sidebarOpen: false,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    };
});