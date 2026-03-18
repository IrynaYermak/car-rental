import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarStore {
  favoriteCars: string[];
  setFavoriteCars: (id: string) => void;
  isFavoriteCar: (id: string) => boolean;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      favoriteCars: [],
      setFavoriteCars: (id) =>
        set((state) => ({
          favoriteCars: state.favoriteCars.includes(id)
            ? state.favoriteCars.filter((carId) => carId !== id)
            : [...state.favoriteCars, id],
        })),
      isFavoriteCar: (id) => get().favoriteCars.includes(id),
    }),
    {
      name: "carStore",
      partialize: (state) => ({ favoriteCars: state.favoriteCars }),
    }
  )
);
