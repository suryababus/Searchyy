console.log("content script");

(async () => {
  const response = await chrome.runtime.sendMessage({
    type: "index",
    url: window.location.href,
    content: document.body.innerText.toLowerCase(),
  });
  // do something with response here, not outside the function
  console.log(response);
  chrome.runtime.onMessage.addListener(function (
    request,
    _sender,
    sendResponse
  ) {
    switch (request.type) {
      case "search": {
        (window as any).find(request.key);
        sendResponse("done");
      }
    }
  });
})();
