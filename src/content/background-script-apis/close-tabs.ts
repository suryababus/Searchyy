export const closeTabs = (tabs: number[]) => {
  return chrome.runtime.sendMessage({
    action: "CLOSE_TABS",
    tabs: tabs,
  });
};
