import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const cartStore = create(
  persist(
    (set) => ({
      courses: [],

      setCourses: (courses) => {
        set((store) => ({ courses: courses }));
      },
    }),
    {
      name: "zustand-cart-admin",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        courses: state.courses,
      }),
    }
  )
);

export default cartStore;
