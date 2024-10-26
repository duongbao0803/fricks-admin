import { ProductType } from "@/types/product.types";
import { create } from "zustand";

const useStore = create<{
  data: ProductType[];
  setData: (updateFunction: (prevData: ProductType[]) => ProductType[]) => void;
}>((set) => ({
  data: [],
  setData: (updateFunction) =>
    set((state) => ({ data: updateFunction(state.data) })),
}));

export default useStore;
