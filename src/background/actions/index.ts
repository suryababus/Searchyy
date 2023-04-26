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
import { TabIndexDocument } from "../repository/tabs-repo";

export type SearchResponseType = {
  tabs: TabIndexDocument[];
  groupTabs: any;
  currentTab: chrome.tabs.Tab;
  query: string;
};

chrome.runtime.onMessage.addListener(function (_request, sender, sendResponse) {
  let request = _request as ActionRequest;

  switch (request.action) {
    case "SEARCH":
      {
        const searchRequest = request as SeachRequest;
        const tabSearchResponse = SearchTabs(searchRequest);

        if (sender.tab) {
          const response: SearchResponseType = {
            tabs: tabSearchResponse,
            currentTab: sender.tab,
            groupTabs: [],
            query: request.query,
          };
          sendResponse(response);
        }

        // const searchKey = request.query;
        // chrome.tabs.query({}, (tabs) => {
        //   const filteredTabs = tabs.filter(
        //     (tab) =>
        //       tab.title?.toLowerCase().includes(searchKey) ||
        //       tab.url?.toLowerCase().includes(searchKey)
        //   );
        //   const response = {
        //     tabs: filteredTabs,
        //     tabGroups: [
        //       {
        //         name: "new group",
        //         urls: ["url1", "url2"],
        //       },
        //     ],
        //     currentTab: sender.tab,
        //   };
        //
        //   sendResponse(response);
        // });
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
            if (doneCount === tabIds.length) {
              sendResponse("success");
            }
          });
        });
      }
      break;
    case "GO_TO_TAB":
      {
        const tabId = request.tabID;

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
      if (sender.tab) {
        request.tabData = sender.tab;
        ProfileFunction("TabOpened", TabOpened, request as TabOpenedRequest);
      }
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
