import { createUserSlice, TUserSlice } from "@/stores/user.store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TBoundSlice = TUserSlice;

const useBoundStore = create<TBoundSlice>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
  })),
);

export default useBoundStore;
