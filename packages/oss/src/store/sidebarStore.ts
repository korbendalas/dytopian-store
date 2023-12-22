
import {create} from 'zustand';

type sidebarStoreProps = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;

}

export  const useSidebarStore = create<sidebarStoreProps>((set) => {
    return {
        sidebarOpen: false,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    };
});