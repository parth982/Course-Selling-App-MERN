import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const cartStore = create(
  persist(
    (set) => ({
      isCartOpen: false,
      cart: [],
      courses: [],
      purchasedCourses: [],

      setCourses: (courses) => {
        set((store) => ({ courses: courses }));
      },

      setPurchasedCourses: (purchasedCourses) => {
        set((store) => ({ purchasedCourses: purchasedCourses }));
      },

      addToCart: (course) => {
        set((store) => ({
          cart: [...store.cart, course],
        }));
      },

      removeFromCart: ({ id }) => {
        set((store) => ({
          cart: store.cart.filter((course) => course._id !== id),
        }));
      },

      setIsCartOpen: () => {
        set((store) => ({
          isCartOpen: !store.isCartOpen,
        }));
      },
    }),
    {
      name: "zustand-cart-user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isCartOpen: state.isCartOpen,
        cart: state.cart,
        courses: state.courses,
        purchasedCourses: state.purchasedCourses,
      }),
    }
  )
);

export default cartStore;
