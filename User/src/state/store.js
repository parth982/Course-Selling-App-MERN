import { create } from "zustand";

const AuthStore = create((set) => ({
  isLogged: false,

  setIsLogged: () => {
    set((store) => ({ isLogged: !store.isLogged }));
  },
}));

export default AuthStore;
