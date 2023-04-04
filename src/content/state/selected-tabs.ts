import { create } from "zustand";

type SelectedTabsType = {
  selectedTabIds: number[];
  addSelectedTab: (tabId: number) => void;
  removeSelectedTab: (tabId: number) => void;
  reset: () => void;
};

export const useSelectedTab = create<SelectedTabsType>((set) => ({
  selectedTabIds: [],
  addSelectedTab: (tabId: number) =>
    set((value) => {
      if (value.selectedTabIds.includes(tabId)) {
        return value;
      }
      return {
        selectedTabIds: [...value.selectedTabIds, tabId],
      };
    }),
  removeSelectedTab: (tabId: number) =>
    set((value) => ({
      selectedTabIds: value.selectedTabIds.filter(
        (selectedTabId) => selectedTabId !== tabId
      ),
    })),
  reset: () => {
    set((value) => ({
      selectedTabIds: [],
    }));
  },
}));
