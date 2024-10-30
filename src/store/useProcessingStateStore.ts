import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = 'upload' | 'processing' | 'download'
type Store = {
  state: State;
  results: Record<string, any>
  setState: (state: State) => void;
  setResults: (results: any) => void
};


const useProcessingStateStore = create<Store>()(
  persist(
    (set) => ({
      state: 'upload',
      results: {},
      setState: (state: State) =>
        set((store) => ({
          ...store,
          state: state,
        })),
        setResults: (results: any) => set((store) => ({
            ...store,
            results: results
        }))
    }),
    { name: 'processing-state-store' },
  ),
);

export default useProcessingStateStore;