export const tabOpened = (content: string) => {
  return chrome.runtime.sendMessage({
    action: "TAB_OPENED",
    tabContent: content,
  });
};
