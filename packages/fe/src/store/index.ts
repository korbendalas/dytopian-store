import { createCommonStore } from '@/store/common';
import create from 'zustand';
// // Define your store type
export type AppStore = {
  mode: string;
};

export const useStore = create<AppStore>((setState, getState, store) => ({
  ...createCommonStore(setState, getState),
  // cart: createCartStore(setState, getState),
}));
