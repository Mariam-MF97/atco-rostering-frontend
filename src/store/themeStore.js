import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { theme as antdTheme } from 'antd';

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
