import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  // Premier sidebar (principal)
  mainSidebarCollapsed: boolean;
  setMainSidebarCollapsed: (collapsed: boolean) => void;
  toggleMainSidebar: () => void;

  // Deuxième sidebar (contextuel)
  contextSidebarOpen: boolean;
  currentEventId: string | null;
  setContextSidebarOpen: (open: boolean) => void;
  setCurrentEventId: (eventId: string | null) => void;

  // Actions combinées
  enterEventContext: (eventId: string) => void;
  exitEventContext: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      // Premier sidebar (principal)
      mainSidebarCollapsed: true,
      setMainSidebarCollapsed: (collapsed: boolean) =>
        set({ mainSidebarCollapsed: collapsed }),
      toggleMainSidebar: () =>
        set((state) => ({ mainSidebarCollapsed: !state.mainSidebarCollapsed })),

      // Deuxième sidebar (contextuel)
      contextSidebarOpen: false,
      currentEventId: null,
      setContextSidebarOpen: (open: boolean) =>
        set({ contextSidebarOpen: open }),
      setCurrentEventId: (eventId: string | null) =>
        set({ currentEventId: eventId }),

      // Actions combinées
      enterEventContext: (eventId: string) =>
        set({
          mainSidebarCollapsed: true,
          contextSidebarOpen: true,
          currentEventId: eventId
        }),

      exitEventContext: () =>
        set({
          mainSidebarCollapsed: false,
          contextSidebarOpen: false,
          currentEventId: null
        })
    }),
    {
      name: 'sidebar-store',
      partialize: (state) => ({
        mainSidebarCollapsed: state.mainSidebarCollapsed
        // Ne pas persister le contexte d'événement
      })
    }
  )
);
