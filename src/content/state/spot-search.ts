import { create } from "zustand";

type SpotSearchType = {
  visible: boolean;
  highlightedSearchResult: number;
  setVisibility: (visible: boolean) => void;
  setHighlightedSearchResult: (highlightedSearchResult: number) => void;
};

export const useSpotSearch = create<SpotSearchType>((set) => ({
  visible: false,
  highlightedSearchResult: 0,
  setVisibility: (visible: boolean) => set((state) => ({ visible })),
  setHighlightedSearchResult: (highlightedSearchResult: number) =>
    set((state) => ({ highlightedSearchResult })),
}));
