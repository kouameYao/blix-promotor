import { create, StateCreator } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const store: StateCreator<AppState> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
});

const useStore = create<AppState>(store);

export default useStore;
