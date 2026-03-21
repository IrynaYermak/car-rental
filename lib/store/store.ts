import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterFormInfo } from "@/types/FormInfo";

interface CarStore {
  filter: FilterFormInfo;

  favoriteCars: string[];
  setFilter: (filterData: FilterFormInfo) => void;
  clearFilter: () => void;
  setFavoriteCars: (id: string) => void;
  isFavoriteCar: (id: string) => boolean;
}

const initialFilter: FilterFormInfo = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      filter: initialFilter,
      setFilter: (filterData) => set(() => ({ filter: filterData })),
      clearFilter: () => set(() => ({ filter: initialFilter })),

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
      partialize: (state) => ({
        favoriteCars: state.favoriteCars,
        filter: state.filter,
      }),
    }
  )
);
