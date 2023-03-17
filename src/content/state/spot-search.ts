import { create } from "zustand";

type SpotSearchType = {
  visible: boolean;
  setVisibility: (visible: boolean) => void;
};

export const useSpotSearch = create<SpotSearchType>((set) => ({
  visible: false,
  setVisibility: (visible: boolean) => set((state) => ({ visible })),
}));
