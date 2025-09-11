import { User } from "@/services/types/api-endpoints";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => {
        console.log("Zustand setUser called with:", user);
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        });
        console.log("Zustand store updated, isAuthenticated:", !!user);
      },

      setAuthenticated: (authenticated) => {
        console.log("Zustand setAuthenticated called with:", authenticated);
        set({ isAuthenticated: authenticated });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) =>
        set({
          error,
          isLoading: false,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        }),

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for common use cases
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useUserStore((state) => state.isLoading);
export const useAuthError = () => useUserStore((state) => state.error);

// Helper hooks
export const useUserBalance = () =>
  useUserStore((state) => state.user?.balance || 0);
export const useUserName = () =>
  useUserStore((state) => state.user?.userName || "");
export const useUserEmail = () =>
  useUserStore((state) => state.user?.email || "");
export const useUserType = () =>
  useUserStore((state) => state.user?.userType || "");
export const useUserFullName = () =>
  useUserStore((state) => state.user?.fullName || "");

// Actions
export const useUserActions = () =>
  useUserStore((state) => ({
    setUser: state.setUser,
    setAuthenticated: state.setAuthenticated,
    setLoading: state.setLoading,
    setError: state.setError,
    clearUser: state.clearUser,
    updateUser: state.updateUser,
    logout: state.logout,
  }));
