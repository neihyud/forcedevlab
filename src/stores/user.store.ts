import { StateCreator } from "zustand";

import { TUserDetail } from "@/types/user";

export type TUserSlice = {
  userDetail: TUserDetail | null;
  setUserDetail: (userDetail: TUserDetail | null) => void;
  resetUserSlice: () => void;
};

const UserSliceInitialState = {
  userDetail: null,
  suggestedCourses: null,
};

const createUserSlice: StateCreator<TUserSlice, [], [], TUserSlice> = (
  set,
) => ({
  ...UserSliceInitialState,
  setUserDetail: (userDetail) => {
    set(() => ({
      userDetail: userDetail,
    }));
  },
  resetUserSlice: () => {
    set((prev) => UserSliceInitialState);
  },
});

export { createUserSlice };
