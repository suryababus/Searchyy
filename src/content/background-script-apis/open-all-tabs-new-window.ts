export const openTabsInNewWindow = (tabs: number[]) => {
  return chrome.runtime.sendMessage({
    action: "OPEN_TABS_NEW_WINDOW",
    tabs: tabs,
  });
};
