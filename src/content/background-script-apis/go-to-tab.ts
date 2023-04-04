export const goToTab = (tabID: number) => {
  chrome.runtime.connect();
  return chrome.runtime.sendMessage({
    action: "GO_TO_TAB",
    tabID: tabID,
  });
};
