import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  name: string;
  rename: (newName: string) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        name: "",
        rename: (name) => set({ name }, undefined, "RENAME"),
      }),
      { name: "userStore" }
    )
  )
);
