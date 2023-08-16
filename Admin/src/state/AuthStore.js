import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const AuthStore = create(
  persist(
    (set) => ({
      isLogged: false,

      setIsLogged: () => {
        set((store) => ({ isLogged: !store.isLogged }));
      },
    }),
    {
      name: "zustand-auth-admin",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLogged: state.isLogged,
      }),
    }
  )
);

export default AuthStore;
