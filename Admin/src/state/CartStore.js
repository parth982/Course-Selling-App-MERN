import { create } from "zustand";

const cartStore = create((set) => ({
  courses: [],
  setCourses: (courses) => {
    set((store) => ({ courses: courses }));
  },
}));

export default cartStore;
