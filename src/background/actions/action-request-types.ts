export type SeachRequest = {
  action: "SEARCH";
  query: string;
};

export type OpenTabRequest = {
  action: "OPEN_TAB";
  query: string;
  tabData: chrome.tabs.Tab;
};

export type TabOpenedRequest = {
  action: "TAB_OPENED";
  tabData: chrome.tabs.Tab;
  tabContent: string;
};

export type TabUpdatedRequest = {
  action: "TAB_UPDATED";
  tabData: chrome.tabs.Tab;
  tabContent: string;
};

export type TabClosedRequest = {
  action: "TAB_CLOSED";
  tabData: chrome.tabs.Tab;
};

export type AddTabsToGroupRequest = {
  action: "ADD_TABS_TO_GROUP";
  tabs: chrome.tabs.Tab[];
  groupName: string;
};

export type RemoveTabsFromGroupRequest = {
  action: "REMOVE_TABS_FROM_GROUP";
  tabs: chrome.tabs.Tab[];
  groupName: string;
};

export type DeleteGroupRequest = {
  action: "DELETE_GROUP";
  groupName: string;
};

//Array of Array of number pairs
//Each pair represents the start and end index of a matched string

export type SearchResponse = {
  tabId: string;
  tabUrl: string;
  tabTitle: string;
  tabFavIconUrl: string;
  tabContent: string;
  matchedContent: {
    indices: [number, number][];
    value: string;
    key: string;
  }[];
};
export type OpenTabsInNewWindowRequest = {
  action: "OPEN_TABS_NEW_WINDOW";
  tabs: number[];
};

export type CloseTabs = {
  action: "CLOSE_TABS";
  tabs: number[];
};

export type GoToTab = {
  action: "GO_TO_TAB";
  tabID: number;
};

export type ActionRequest =
  | SeachRequest
  | OpenTabRequest
  | TabOpenedRequest
  | TabUpdatedRequest
  | TabClosedRequest
  | AddTabsToGroupRequest
  | RemoveTabsFromGroupRequest
  | DeleteGroupRequest
  | OpenTabsInNewWindowRequest
  | CloseTabs
  | GoToTab;
