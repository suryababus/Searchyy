import { search } from "./background-script-apis/search";
import { tabOpened } from "./background-script-apis/tab-opened";
import { useSpotSearch } from "./state/spot-search";

(async () => {
  tabOpened(document.body.innerText.toLowerCase());
  chrome.runtime.onMessage.addListener(function (
    request,
    _sender,
    sendResponse
  ) {
    switch (request.type) {
      case "OPEN_SEARCH_BAR":
        const result = search("");
        result.then(() => {
          useSpotSearch.setState({
            visible: true,
          });
        });

        sendResponse("done");
    }
    return true;
  });
})();
