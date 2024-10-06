import { ProductType } from "@/types/product.types";
import { create } from "zustand";

const useStore = create<{
  data: ProductType[];
  setData: (data: ProductType[]) => void;
}>((set) => ({
  data: [],
  setData: (data: ProductType[]) => set({ data }),
}));

export default useStore;
