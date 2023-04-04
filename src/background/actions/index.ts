import { ActionRequest } from "./action-request-types";

export const registerListener = () => {
  console.log("registerListener");
  chrome.runtime.onMessage.addListener(function (
    _request,
    sender,
    sendResponse
  ) {
    let request = _request as ActionRequest;
    console.log("request", request);
    switch (request.action) {
      case "SEARCH":
        {
          const searchKey = request.query;
          chrome.tabs.query({}, (tabs) => {
            const filteredTabs = tabs.filter(
              (tab) =>
                tab.title?.toLowerCase().includes(searchKey) ||
                tab.url?.toLowerCase().includes(searchKey)
            );
            const response = {
              tabs: filteredTabs,
              tabGroups: [
                {
                  name: "new group",
                  urls: ["url1", "url2"],
                },
              ],
              currentTab: sender.tab,
            };
            console.log(response);
            sendResponse(response);
          });
        }
        break;
      case "OPEN_TABS_NEW_WINDOW":
        {
          let tabIds = request.tabs;
          const firstTabId = tabIds[0];
          tabIds = tabIds.slice(1);
          chrome.windows.create({ tabId: firstTabId }).then((newWindow) => {
            tabIds.forEach((id, index) => {
              chrome.tabs.move(id, { index: index, windowId: newWindow.id });
            });
            sendResponse("success");
          });
        }
        break;
      case "CLOSE_TABS":
        {
          const tabIds = request.tabs;
          let doneCount = 0;
          tabIds.forEach((id, index) => {
            chrome.tabs.remove(id, () => {
              doneCount++;
              if (doneCount === tabIds.length - 1) {
                sendResponse("success");
              }
            });
          });
        }
        break;
      case "GO_TO_TAB": {
        const tabId = request.tabID;
        console.log(tabId);
        chrome.tabs.update(tabId, { active: true }, (tab) => {
          if (tab?.windowId) {
            chrome.windows.update(tab?.windowId, { focused: true }, () => {
              sendResponse("success");
            });
          }
        });
      }
    }
    return true;
  });
};
