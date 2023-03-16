const index = new Map<string, any>();

type Meta = {
  url: string;
  tabId: number;
};

const indexAdd = (meta: Meta, content: string) => {
  index.set(meta.url, { content, meta });
};

const search = (key: string) => {
  const searchResult = [];
  for (let entry of Array.from(index.entries())) {
    let url = entry[0];
    let value = entry[1];
    let foundPosition = value.content.indexOf(key);
    if (foundPosition !== -1) {
      searchResult.push({
        url,
        meta: value.meta,
        matchString: value.content.substring(
          foundPosition - 100,
          foundPosition + 100
        ),
      });
    }
  }
  return searchResult;
};

function insertContentScript(tab: chrome.tabs.Tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id || 0 },
      files: ["dist/content/index.js"],
    })
    .then(() => {
      console.log("INJECTED THE FOREGROUND SCRIPT.");
    })
    .catch((err) => console.log(err));
}

try {
  console.log("background Script");
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(insertContentScript);
  });
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab?.url || "")) {
      insertContentScript(tab);
    }
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.type) {
      case "index":
        {
          const meta = {
            url: request.url,
            tabId: sender.tab?.id || 0,
          };
          indexAdd(meta, request.content);
          sendResponse("indexed");
        }
        break;
      case "search": {
        const key = request.key;
        sendResponse(search(key));
      }
    }
  });
} catch (e) {
  console.log(e);
}
