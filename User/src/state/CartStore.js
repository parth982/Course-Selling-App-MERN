import { create } from "zustand";

const cartStore = create((set) => ({
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
}));

export default cartStore;
