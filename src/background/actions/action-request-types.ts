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

export type ActionRequest =
  | SeachRequest
  | OpenTabRequest
  | TabOpenedRequest
  | TabUpdatedRequest
  | TabClosedRequest
  | AddTabsToGroupRequest
  | RemoveTabsFromGroupRequest
  | DeleteGroupRequest;
