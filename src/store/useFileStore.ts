import { persist } from 'zustand/middleware';
import {create} from 'zustand'

type Store = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const useFileStore = create<Store>()(
  persist(
    (set) => ({
      file: null,
      setFile: (file: File | null) =>
        set((store) => ({
          ...store,
          file,
        })),
    }),
    { name: 'file-store' },
  ),
);

export default useFileStore;
