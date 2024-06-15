import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type TokenStoreType = {
  token: string;
  setToken: (data: string) => void;
};

export const useTokenStore = create<TokenStoreType>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data) => set(() => ({ token: data })),
      }),
      { name: "token-store" }
    )
  )
);
