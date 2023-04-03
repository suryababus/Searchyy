import { ActionRequest, TabOpenedRequest, TabClosedRequest, SeachRequest } from "./action-request-types";
import { TabClosed } from "./tab-closed-action";
import { TabOpened } from "./tab-opened-action";
import { SearchTabs } from "./search-action";
import {ProfileFunction} from "../profiler/profiler1"


chrome.runtime.onMessage.addListener(async function (
  _request,
  sender,
  sendResponse
) {
  let request = _request as ActionRequest;

  switch (request.action) {
    case "TAB_OPENED":
      {
        ProfileFunction("TabOpened",TabOpened, request as TabOpenedRequest);
      }
      break;
    case "TAB_CLOSED":
      {
        ProfileFunction("TabClosed",TabClosed, request as TabClosedRequest);
      }
      break;
    case "SEARCH":
      {
        const searchRequest = request as SeachRequest;
        const searchResponse = SearchTabs(searchRequest);
        sendResponse(searchResponse);
      }
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
});
