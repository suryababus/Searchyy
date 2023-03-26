import { ActionRequest } from "./action-request-types";
import { openTab } from "./open-tab-action";

chrome.runtime.onMessage.addListener(async function (
  _request,
  sender,
  sendResponse
) {
  let request = _request as ActionRequest;

  switch (request.action) {
    case "OPEN_TAB":
      {
        const tabId = request.tabData;
        openTab();
        // const searchKey = request.searchkey;
        // var updateProperties = { active: true };
        // try {
        //   const tab = await chrome.tabs.get(tabId);
        //   await chrome.tabs.update(tabId, updateProperties);
        //   chrome.tabs.sendMessage(tabId, { type: "search", key: searchKey });
        //   await chrome.windows.update(tab.windowId, { focused: true });
        // } catch (e) {
        //   if (e instanceof Error) {
        //     // toaster.negative(e.message);
        //   }
        // }
      }
      break;
  }
});
