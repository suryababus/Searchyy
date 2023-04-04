import {
  ActionRequest,
  TabOpenedRequest,
  TabClosedRequest,
  SeachRequest,
} from "./action-request-types";
import { TabClosed } from "./tab-closed-action";
import { TabOpened } from "./tab-opened-action";
import { SearchTabs } from "./search-action";
import { ProfileFunction } from "../profiler/profiler1";

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

          // const searchRequest = request as SeachRequest;
          // const searchResponse = SearchTabs(searchRequest);
          // sendResponse(searchResponse);
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
      case "GO_TO_TAB":
        {
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
        break;
      case "TAB_OPENED":
        ProfileFunction("TabOpened", TabOpened, request as TabOpenedRequest);
        break;
      case "TAB_CLOSED":
        ProfileFunction("TabClosed", TabClosed, request as TabClosedRequest);
        break;
      case "TAB_UPDATED":
        break;
      case "ADD_TABS_TO_GROUP":
        break;

      case "REMOVE_TABS_FROM_GROUP":
        break;

      case "DELETE_GROUP":
        break;

      default:
    }
    return true;
  });
};
